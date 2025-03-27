import { AxiosInterceptorResponse } from "@odg/axios";
import {
    type InterceptorManager,
    type ResponseInterface,
} from "@odg/message";

import { TlsAxiosResponseParser } from "../parser/TlsAxiosResponseParser";

export class TlsAxiosInterceptorResponse<
    RequestData,
    ResponseData,
> extends AxiosInterceptorResponse<
        RequestData,
        ResponseData
    > implements InterceptorManager<ResponseInterface<RequestData, ResponseData>> {

    protected readonly parser = TlsAxiosResponseParser;

}
