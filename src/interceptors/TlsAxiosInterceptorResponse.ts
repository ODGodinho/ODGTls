import { AxiosInterceptorResponse } from "@odg/axios";
import type {
    InterceptorManager,
    MessageResponse,
} from "@odg/message";

import { TlsAxiosResponseParser } from "../parser/TlsAxiosResponseParser";

export class TlsAxiosInterceptorResponse<
    RequestData,
    ResponseData,
> extends AxiosInterceptorResponse<
        RequestData,
        ResponseData
    > implements InterceptorManager<MessageResponse<ResponseData>> {

    protected readonly parser = TlsAxiosResponseParser;

}
