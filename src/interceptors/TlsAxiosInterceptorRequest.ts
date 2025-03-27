import { AxiosInterceptorRequest } from "@odg/axios";
import {
    type InterceptorManager,
} from "@odg/message";

import { type TlsRequestInterface } from "src/interfaces/TlsOptionsInterface";

import { TlsAxiosRequestParser } from "../parser/TlsAxiosRequestParser";

export class TlsAxiosInterceptorRequest<
    RequestData,
> extends AxiosInterceptorRequest<
        RequestData
    > implements InterceptorManager<TlsRequestInterface<RequestData>> {

    protected readonly parser = TlsAxiosRequestParser;

}
