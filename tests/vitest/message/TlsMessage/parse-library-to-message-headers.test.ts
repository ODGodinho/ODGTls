import { TlsAxiosRequestParser } from "src/parser/TlsAxiosRequestParser";

describe("Tls Message - parser headers", () => {
    test.concurrent("Remove headers com prefixo poptls-", () => {
        const request = TlsAxiosRequestParser.parseLibraryToMessage({
            url: "https://example.com",
            headers: {
                "content-type": "application/json",
                "x-trace-id": "trace-123",
                "POPTLS-URL": "https://tls.example.com",
                "poptls-timeout": "10",
            },
            $tlsOptions: {},
        });

        expect(request.headers).toEqual({
            "content-type": "application/json",
            "x-trace-id": "trace-123",
        });
    });

    test.concurrent("Mantem comportamento com headers undefined", () => {
        const request = TlsAxiosRequestParser.parseLibraryToMessage({
            url: "https://example.com",
            headers: undefined,
            $tlsOptions: {},
        });

        expect(request.headers).toEqual({});
    });
});
