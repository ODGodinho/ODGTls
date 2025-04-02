import { Exception } from "@odg/exception";
import { type ResponseInterface } from "@odg/message";

import { type TlsRequestInterface } from "../interfaces/TlsOptionsInterface";

export class TlsMessageException<RequestData, ResponseData = unknown> extends Exception {

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
