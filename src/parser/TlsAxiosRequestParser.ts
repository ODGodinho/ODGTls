import { AxiosRequestParser } from "@odg/axios";
import { type ProxyConfigInterface } from "@odg/message";
import { type AxiosRequestConfig } from "axios";

import { type TlsAxiosRequestConfigExtra, type TlsRequestInterface } from "../interfaces/TlsOptionsInterface";

export class TlsAxiosRequestParser extends AxiosRequestParser {

    /**
     * Parse MessageInterface to Axios
     *
     * @template {any} RequestD Dados Request Axios
     * @template {Record<string, unknown>} ExtraData Dados Request Axios extras
     * @param {Partial<TlsRequestInterface<RequestD>>} options Dados Request
     * @returns {AxiosRequestConfig<RequestD>}
     */
    public static parseMessageToLibrary<RequestD>(
        options: Partial<TlsRequestInterface<RequestD>>,
    ): AxiosRequestConfig<RequestD> {
        return Object.fromEntries(Object.entries({
            ...super.parseMessageToLibrary(options),
            url: options.tls!.url,
            proxy: undefined,
            baseURL: undefined,
            headers: {
                ...options.headers,
                "poptls-url": this.getUrl<RequestD>(options),
                "poptls-proxy": this.getProxyUrl(options.proxy),
                "poptls-allowredirect": String(this.getAllowRedirect(options)),
                "poptls-timeout": this.getTimeInSeconds(options),
            },
            $tlsOptions: {
                url: options.url,
                baseUrl: options.baseURL,
                proxy: options.proxy,
                tls: options.tls,
            },
        } as TlsAxiosRequestConfigExtra<RequestD>).filter(([ , value ]) => value !== undefined));
    }

    /**
     * Parse Request Axios configuration
     *
     * @template {any} RequestD Dados Request Axios
     * @param {TlsAxiosRequestConfigExtra<RequestD>} config Dados Request
     * @returns {TlsRequestInterface<RequestD>}
     */
    public static parseLibraryToMessage<RequestD>(
        config: TlsAxiosRequestConfigExtra<RequestD>,
    ): TlsRequestInterface<RequestD> {
        return Object.fromEntries(
            Object.entries({
                ...super.parseLibraryToMessage(config),
                url: config.$tlsOptions?.url,
                baseURL: config.$tlsOptions?.baseUrl,
                proxy: config.$tlsOptions?.proxy,
                tls: config.$tlsOptions?.tls,
                headers: {
                    ...config.headers,
                    "poptls-url": undefined,
                    "poptls-proxy": undefined,
                    "poptls-allowredirect": undefined,
                    "poptls-timeout": undefined,
                },
            } as TlsRequestInterface<RequestD>).filter(([ , value ]) => value !== undefined),
        ) as TlsRequestInterface<RequestD>;
    }

    private static getUrl<RequestD = unknown>(
        options: Partial<TlsRequestInterface<RequestD>>,
    ): string {
        return `${options.baseURL ?? ""}${options.url ?? ""}`;
    }

    private static getProxyUrl(proxy: ProxyConfigInterface | false | undefined): string | undefined {
        if (!proxy) return;

        const proxyPort = proxy.port ? `:${proxy.port}` : "";
        if (proxy.auth?.username) {
            return `${proxy.protocol}://${proxy.auth.username}:${proxy.auth.password}@${proxy.host}${proxyPort}`;
        }

        return `${proxy.protocol}://${proxy.host}${proxyPort}`;
    }

    private static getAllowRedirect<RequestD = unknown>(
        options: Partial<TlsRequestInterface<RequestD>>,
    ): boolean {
        return options.tls?.allowRedirect ?? true;
    }

    private static getTimeInSeconds<RequestD = unknown>(
        options: Partial<TlsRequestInterface<RequestD>>,
    ): number | undefined {
        const { timeout } = options;

        if (typeof timeout === "number") {
            const miliSecondsToSeconds = 1000;
            const newTimeout = Math.trunc(timeout / miliSecondsToSeconds);

            return newTimeout > 0 ? newTimeout : 0;
        }

        return undefined;
    }

}
