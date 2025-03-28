import { TlsMessage } from "src";

describe("Tls Message", () => {
    const tlsHeader = "status";
    const requestUrl = "http://localhost:8082/";
    const cloudFlareIp = "https://1.1.1.1";

    test.concurrent("Teste request without url and BaseURL Instance", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: requestUrl,
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
                url: requestUrl,
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
                url: requestUrl,
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
                url: requestUrl,
            },
            baseURL: cloudFlareIp,
        });
        const tlsResponse = messageTls.request({
            baseURL: "https://github.com",
            timeout: 10_000,
        });

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty("request.baseURL", "https://github.com"),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader, 200),
        ]);
    });
});
