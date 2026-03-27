import { TlsAxiosRequestParser } from "src/parser/TlsAxiosRequestParser";

describe("Tls Message", () => {
    const baseOptions = {
        tls: {
            url: "http://localhost:8082",
        },
        baseURL: "https://tls.browserleaks.com/json",
    };

    test.concurrent("Test with Base URL", async () => {
        expect(TlsAxiosRequestParser["getUrl"](baseOptions)).toBe("https://tls.browserleaks.com/json");
    });

    test.concurrent("Proxy with BaseUrl Clear", async () => {
        expect(TlsAxiosRequestParser["getUrl"]({
            ...baseOptions,
            baseURL: "",
        })).toBe("");
    });

    test.concurrent("Proxy with Url", async () => {
        expect(TlsAxiosRequestParser["getUrl"]({
            ...baseOptions,
            url: "/test",
        })).toBe("https://tls.browserleaks.com/json/test");
    });

    test.concurrent("url with params", async () => {
        expect(TlsAxiosRequestParser["getUrl"]({
            ...baseOptions,
            url: "/test",
            params: {
                key1: "item 1",
                key2: "result 2",
            },
        })).toBe("https://tls.browserleaks.com/json/test?key1=item%201&key2=result%202");
    });

    test.concurrent("Proxy with Url no baseUrl", async () => {
        expect(TlsAxiosRequestParser["getUrl"]({
            url: "/test",
        })).toBe("/test");
    });
});
