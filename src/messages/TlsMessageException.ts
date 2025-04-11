import { MessageUnknownException, type ResponseInterface } from "@odg/message";

import { type TlsRequestInterface } from "../interfaces/TlsOptionsInterface";

export class TlsMessageException<
    RequestData,
    ResponseData = unknown,
> extends MessageUnknownException<RequestData, ResponseData> {

    public constructor(
        public message: string,
        preview?: unknown,
        public code?: string,
        public request?: TlsRequestInterface<RequestData>,
        public response?: ResponseInterface<ResponseData>,
    ) {
        super(message, preview, code);
    }

}
