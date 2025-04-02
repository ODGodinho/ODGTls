import { type AxiosRequestConfigExtra } from "@odg/axios/dist/interfaces";
import { type RequestOptionsParametersInterface, type RequestInterface } from "@odg/message";

export interface TlsRequestInterface<
    RequestData,
    ExtraData extends Record<string, unknown> = Record<string, unknown>,
> extends RequestInterface<RequestData, ExtraData> {
    tls?: {
        url?: string;
        allowRedirect?: boolean;
    };
}

export interface TlsOptionsConstructorInterface<
    RequestData,
    ExtraData extends Record<string, unknown> = Record<string, unknown>,
> extends RequestOptionsParametersInterface<RequestData, ExtraData> {
    tls: {
        url: string;
        allowRedirect?: boolean;
    };
}

export interface TlsAxiosRequestConfigExtra<RequestData> extends AxiosRequestConfigExtra<RequestData> {
    $tlsOptions: RequestInterface<unknown>["extras"];
}
