import { AxiosInterceptorResponse } from "@odg/axios";
import {
    type MessageResponse,
    type InterceptorManager,
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
