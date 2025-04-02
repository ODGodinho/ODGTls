import { Exception, UnknownException } from "@odg/exception";
import { MessageException } from "@odg/message";
import { type InternalAxiosRequestConfig, AxiosError, AxiosHeaders } from "axios";

import { TlsMessage, TlsMessageException } from "src";

describe("Tls Message", () => {
    const tlsHeader = "status";
    const tlsUrl = "https://1.1.1.2/";
    const cloudFlareIp = "https://1.1.1.1";
    const baseUrlField = "request.baseURL";

    test.concurrent("Teste request without url and BaseURL Instance", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: tlsUrl,
            },
            baseURL: cloudFlareIp,
        });
        const tlsResponse = messageTls.request({});

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader, 200),
        ]);
    });

    test.concurrent("Teste request with url and BaseUrl Instance", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: tlsUrl,
            },
            baseURL: cloudFlareIp,
        });
        const tlsResponse = messageTls.request({
            url: "/dns",
        });

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader, 200),
        ]);
    });

    test.concurrent("Teste request with url and BaseUrl request", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: tlsUrl,
            },
        });
        const tlsResponse = messageTls.request({
            baseURL: cloudFlareIp,
            url: "/dns",
        });

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader, 200),
        ]);
    });

    test.concurrent("Teste request with timeout", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: tlsUrl,
            },
            baseURL: cloudFlareIp,
        });
        const tlsResponse = messageTls.request({
            baseURL: "https://github.com",
            timeout: 10_000,
        });

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(baseUrlField, "https://github.com"),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader, 200),
        ]);
    });

    test.concurrent("Teste request error", async () => {
        const url404 = "https://reqres.in/api/unknown/23";
        const messageTls = new TlsMessage({
            tls: {
                url: url404,
            },
        });
        const tlsResponse = messageTls.request({
            baseURL: url404,
            url: "zeze",
            timeout: 10_000,
        });

        await Promise.all([
            expect(tlsResponse).rejects.toHaveProperty(baseUrlField, url404),
            expect(tlsResponse).rejects.toHaveProperty("request.url", "zeze"),
            expect(tlsResponse).rejects.toHaveProperty("request.tls.url", url404),
            expect(tlsResponse).rejects.toHaveProperty("response.status", 404),
        ]);

        expect(TlsMessage.isMessageError(await tlsResponse.catch((error: unknown) => error))).toBeTruthy();
    });

    test.concurrent("Teste request timeout", async () => {
        const url404 = "https://reqres.in/api/unknown/23";
        const messageTls = new TlsMessage({
            tls: {
                url: url404,
            },
        });

        const tlsResponse = messageTls.request({
            baseURL: tlsUrl,
            url: "/zeze",
            timeout: 10,
        });

        await Promise.all([
            expect(tlsResponse).rejects.toHaveProperty(baseUrlField, tlsUrl),
            expect(tlsResponse).rejects.toHaveProperty("request.url", "/zeze"),
            expect(tlsResponse).rejects.toHaveProperty("request.tls.url", url404),
            expect(tlsResponse).rejects.empty.toHaveProperty("response"),
        ]);

        expect(TlsMessage.isMessageError(await tlsResponse.catch((error: unknown) => error))).toBeTruthy();
    });

    test.concurrent("Teste Exception parse default", () => {
        const exception = Exception.parse("test");
        expect(exception).toBeInstanceOf(UnknownException);
        expect(exception?.name).toEqual(UnknownException.name);
    });

    test.concurrent("Response without config", async () => {
        const config = { url: "", headers: new AxiosHeaders({}), $tlsOptions: {}};
        const exception = Exception.parse(new AxiosError(
            "test",
            "TEST",
            config,
            undefined,
            {
                data: undefined,
                headers: {},
                status: 200,
                statusText: "OK",
                config: undefined as unknown as InternalAxiosRequestConfig<unknown>,
            },
        ));
        expect(exception).toBeInstanceOf(TlsMessageException);

        const exception2 = Exception.parse(new AxiosError(
            "test",
            "TEST",
            config,
            undefined,
            undefined,
        ));
        expect(exception2).toBeInstanceOf(TlsMessageException);
    });

    test.concurrent("Axios error not identify tls error", () => {
        const exception2 = Exception.parse(new AxiosError(
            "test",
            "TEST",
            undefined,
            undefined,
            undefined,
        ));
        expect(exception2?.name).toBe(MessageException.name);
    });
});
