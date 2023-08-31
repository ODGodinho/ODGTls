import { TlsMessage } from "src";

describe("Tls Message", () => {
    let messageTls: TlsMessage<unknown, unknown>;
    beforeAll(() => {
        messageTls = new TlsMessage({
            tls: {
                url: "http://localhost:8082",
            },
            baseURL: "https://tls.browserleaks.com/json",
        });
    });

    test.concurrent("Test with Base URL", async () => {
        expect(messageTls["getUrl"]({})).toBe("https://tls.browserleaks.com/json");
    });

    test.concurrent("Proxy with BaseUrl Clear", async () => {
        expect(messageTls["getUrl"]({
            baseURL: "",
        })).toBe("");
    });

    test.concurrent("Proxy with Url", async () => {
        expect(messageTls["getUrl"]({
            url: "/test",
        })).toBe("https://tls.browserleaks.com/json/test");
    });

    test.concurrent("Proxy with Url no baseUrl", async () => {
        const messageTls2 = new TlsMessage({
            tls: {
                url: "http://localhost:8082",
            },
        });
        expect(messageTls2["getUrl"]({
            url: "/test",
        })).toBe("/test");
    });
});
