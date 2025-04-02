import { AxiosMessage } from "@odg/axios";
import {
    type InterceptorsInterface,
    type ProxyConfigInterface,
} from "@odg/message";
import {
    type AxiosInterceptorManager,
    type AxiosRequestConfig,
} from "axios";

import { TlsAxiosInterceptorRequest } from "../interceptors/TlsAxiosInterceptorRequest";
import { TlsAxiosInterceptorResponse } from "../interceptors/TlsAxiosInterceptorResponse";
import {
    type TlsOptionsConstructorInterface,
    type TlsRequestInterface,
} from "../interfaces/TlsOptionsInterface";
import { TlsAxiosRequestParser } from "../parser/TlsAxiosRequestParser";
import { TlsAxiosResponseParser } from "../parser/TlsAxiosResponseParser";

import { type TlsMessageException } from "./TlsMessageException";
import { type TlsMessageResponse } from "./TlsMessageResponse";

/**
 * Tls Message class
 *
 * @template {any} RequestData Data of request
 * @template {any} ResponseData Data of response
 */
export class TlsMessage<RequestData, ResponseData> extends AxiosMessage<RequestData, ResponseData> {

    public readonly interceptors: InterceptorsInterface<RequestData, ResponseData>;

    protected readonly requestParser = TlsAxiosRequestParser;

    protected readonly responseParser = TlsAxiosResponseParser;

    protected config: TlsOptionsConstructorInterface<RequestData>;

    protected proxy?: ProxyConfigInterface | false;

    public constructor(config: TlsOptionsConstructorInterface<RequestData>) {
        super({});
        this.proxy = config.proxy;
        this.config = config;

        this.interceptors = Object.freeze({
            request: new TlsAxiosInterceptorRequest<RequestData>(
                this.client.interceptors.request as AxiosInterceptorManager<AxiosRequestConfig<RequestData>>,
            ),
            response: new TlsAxiosInterceptorResponse<RequestData, ResponseData>(
                this.client.interceptors.response,
            ),
        });
    }

    public static isAxiosMessageToTlsError<RequestData = unknown, ResponseData = unknown>(
        message: unknown,
    ): message is TlsMessageException<RequestData, ResponseData> {
        return super.isMessageError(message)
            && !!message.request
            && "$tlsOptions" in message.request
            && !!message.request.$tlsOptions;
    }

    public static isMessageError<RequestData = unknown, ResponseData = unknown>(
        message: unknown,
    ): message is TlsMessageException<RequestData, ResponseData> {
        return super.isMessageError(message)
            && !!message.request
            && "tls" in message.request
            && !!message.request.tls;
    }

    public setDefaultOptions(config: TlsOptionsConstructorInterface<RequestData>): this {
        this.config = config;

        return this;
    }

    public getDefaultOptions(): TlsOptionsConstructorInterface<RequestData> {
        return {
            ...this.config,
        };
    }

    public async request<RequestD = RequestData, ResponseD = ResponseData>(
        options: TlsRequestInterface<RequestD>,
    ): Promise<TlsMessageResponse<RequestD, ResponseD>> {
        return super.request<RequestD, ResponseD>(await this.getNewOptions(options));
    }

    private async getNewOptions<RequestD = RequestData>(
        options: TlsRequestInterface<RequestD>,
    ): Promise<TlsRequestInterface<RequestD>> {
        return {
            ...this.config as TlsRequestInterface<RequestD>,
            ...options,
        };
    }

}
