import { AxiosResponseParser } from "@odg/axios";
import { type AxiosResponse } from "axios";

import { TlsMessageResponse } from "src/messages/TlsMessageResponse";

import { TlsAxiosRequestParser } from "./TlsAxiosRequestParser";

export class TlsAxiosResponseParser extends AxiosResponseParser {

    protected static requestParser = TlsAxiosRequestParser;

    /**
     * Cast AxiosResponse axios To MessageResponse
     *
     * @template {any} RequestD Data Request
     * @template {any} ResponseD Data Response
     * @param {AxiosResponse<ResponseD, RequestD>} response axios Response Object
     * @returns {TlsMessageResponse<RequestD, ResponseD>}
     */
    public static parseLibraryToMessage<RequestD, ResponseD>(
        response: AxiosResponse<ResponseD, RequestD>,
    ): TlsMessageResponse<RequestD, ResponseD> {
        const responseParser = super.parseLibraryToMessage(response);

        return new TlsMessageResponse(
            responseParser.request,
            responseParser.response,
        );
    }

}
