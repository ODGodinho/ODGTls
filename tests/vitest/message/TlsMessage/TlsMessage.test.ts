import { type MessageInterface } from "@odg/message";

import { TlsMessage } from "src";

describe("Tls Message", () => {
    let messageTls: MessageInterface;

    const tlsHeader = "status";
    const requestUrl = "https://1.1.1.1/";

    beforeAll(() => {
        messageTls = new TlsMessage({
            tls: {
                url: requestUrl,
            },
            baseURL: requestUrl,
        });
    });

    test.concurrent("Teste request with poptls-url", async () => {
        const tlsResponse = messageTls.request({});

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader, 200),
        ]);
    });

    test.concurrent("Teste request with timeout", async () => {
        const tlsResponse = messageTls.request({
            timeout: 10_000,
        });

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader),
            expect(tlsResponse).resolves.toHaveProperty(tlsHeader, 200),
        ]);
    });
});
