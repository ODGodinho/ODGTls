import { AxiosMessage } from "@odg/axios";
import {
    type ProxyConfigInterface,
    type RequestInterface,
    type ResponseInterface,
    type DefaultMessageConstructor,
} from "@odg/message";

import { type TlsOptionsConstructorInterface, type TlsOptionsInterface } from "../interfaces/TlsOptionsInterface";

/**
 * Tls Message class
 *
 * @template {any} RequestData Data of request
 * @template {any} ResponseData Data of response
 */
export class TlsMessage<RequestData, ResponseData> extends AxiosMessage<RequestData, ResponseData> {

    protected config: DefaultMessageConstructor<RequestData> & TlsOptionsConstructorInterface;

    public constructor(config: DefaultMessageConstructor<RequestData> & TlsOptionsConstructorInterface) {
        super(config);
        this.config = config;
    }

    public async request<RequestD = unknown, ResponseD = unknown>(
        options: Partial<TlsOptionsInterface> & RequestInterface<RequestD>,
    ): Promise<ResponseInterface<RequestD, ResponseD>> {
        const timeout = this.getTimeInSeconds<RequestD>(options);
        const newOptions: RequestInterface<RequestD> = {
            ...options,
            url: this.config.tls.url,
            headers: {
                "poptls-url": this.getUrl<RequestD>(options),
                "poptls-proxy": this.getProxyUrl([
                    options.proxy,
                    this.config.proxy,
                ]),
                "poptls-allowredirect": String(this.getAllowRedirect<RequestD>(options)),
            },
        };

        if (timeout) newOptions.headers!["poptls-timeout"] = String(timeout);

        newOptions.headers = {
            ...newOptions.headers,
            ...options.headers,
        };

        return super.request<RequestD, ResponseD>(newOptions);
    }

    private getAllowRedirect<RequestD = unknown>(
        options: Partial<TlsOptionsInterface> & RequestInterface<RequestD>,
    ): boolean {
        return options.tls?.allowRedirect ?? this.config.tls.allowRedirect ?? true;
    }

    private getUrl<RequestD = unknown>(options: Partial<TlsOptionsInterface> & RequestInterface<RequestD>): string {
        return `${options.baseURL ?? this.config.baseURL ?? ""}${options.url ?? this.config.url ?? ""}`;
    }

    private getTimeInSeconds<RequestD = unknown>(
        options: Partial<TlsOptionsInterface> & RequestInterface<RequestD>,
    ): number | undefined {
        const timeout = options.timeout ?? this.config.timeout;

        if (timeout) {
            const miliSeconds1000ToSeconds = 1000;
            const newTimeout = Math.trunc(timeout / miliSeconds1000ToSeconds);

            return newTimeout > 0 ? newTimeout : 0;
        }

        return timeout;
    }

    private getProxyUrl(proxies: Array<ProxyConfigInterface | false | undefined>): string | undefined {
        const proxy = proxies.find((myProxy) => myProxy && myProxy.host);
        if (!proxy) return;

        const proxyPort = proxy.port ? `:${proxy.port}` : "";
        if (proxy.auth?.username) {
            return `${proxy.protocol}://${proxy.auth.username}:${proxy.auth.password}@${proxy.host}${proxyPort}`;
        }

        return `${proxy.protocol}://${proxy.host}${proxyPort}`;
    }

}
