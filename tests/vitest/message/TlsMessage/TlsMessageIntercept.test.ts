import { TlsMessage } from "src";

describe("Tls Message", () => {
    const requestUrl = "http://localhost:8082/";
    const cloudFlareIp = "https://1.1.1.1";

    test.concurrent("Teste Request Intercept", async () => {
        const requester = new TlsMessage({
            tls: {
                url: requestUrl,
            },
            baseURL: cloudFlareIp,
        });
        const interceptHeader = "intercept-test";

        requester.interceptors.request.use((config) => {
            if (!config.headers) return config;
            config.headers["teste"] = interceptHeader;

            return config;
        });

        const myRequest = requester.request<undefined>({});

        await Promise.all([
            expect(myRequest).resolves.toHaveProperty("request.headers.teste", interceptHeader),
            expect(myRequest).resolves.toHaveProperty("request.baseURL", cloudFlareIp),
            expect(myRequest).resolves.not.toHaveProperty("request.url"),
        ]);
    });
});
