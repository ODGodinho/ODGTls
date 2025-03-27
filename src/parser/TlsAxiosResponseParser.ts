import { AxiosResponseParser } from "@odg/axios";

import { TlsAxiosRequestParser } from "./TlsAxiosRequestParser";

export class TlsAxiosResponseParser extends AxiosResponseParser {

    protected static requestParser = TlsAxiosRequestParser;

}
