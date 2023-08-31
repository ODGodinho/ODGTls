import { TlsMessage } from "src";

describe("Tls Message", () => {
    let messageTls: TlsMessage<unknown, unknown>;

    beforeAll(() => {
        messageTls = new TlsMessage({
            tls: {
                url: "http://localhost:8082",
            },
        });
    });

    test.concurrent("Proxy without login", async () => {
        expect(messageTls["getProxyUrl"]([ {
            host: "localhost",
            protocol: "http",
            port: 8082,
        } ])).toBe("http://localhost:8082");
    });

    test.concurrent("Proxy with login", async () => {
        expect(messageTls["getProxyUrl"]([ {
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
        expect(messageTls["getProxyUrl"]([ {
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
