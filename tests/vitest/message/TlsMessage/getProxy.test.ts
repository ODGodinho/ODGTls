import { TlsMessage } from "src";

describe("Tls Message", () => {
    test.concurrent("Proxy without login", async () => {
        expect(TlsMessage["getProxyUrl"]([ {
            host: "localhost",
            protocol: "http",
            port: 8082,
        } ])).toBe("http://localhost:8082");
    });

    test.concurrent("Proxy with login", async () => {
        expect(TlsMessage["getProxyUrl"]([ {
            host: "localhost",
            protocol: "http",
            port: 8083,
            auth: {
                username: "user",
                password: "pass",
            },
        } ])).toBe("http://user:pass@localhost:8083");
    });

    test.concurrent("Proxy empty port", async () => {
        expect(TlsMessage["getProxyUrl"]([ {
            host: "localhost",
            protocol: "http",
            port: Number.NaN,
            auth: {
                username: "user",
                password: "pass",
            },
        } ])).toBe("http://user:pass@localhost");
    });
});
