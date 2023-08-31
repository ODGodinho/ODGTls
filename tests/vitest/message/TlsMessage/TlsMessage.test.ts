import { AxiosMessage } from "@odg/axios";
import { type MessageInterface } from "@odg/message";

import { TlsMessage } from "src";

describe("Tls Message", () => {
    let messageTls: MessageInterface;
    let messageAxios: MessageInterface;
    const akamaiHash = "data.akamai_hash";

    beforeAll(() => {
        messageTls = new TlsMessage({
            tls: {
                url: "http://localhost:8082",
            },
            baseURL: "https://tls.browserleaks.com/json",
        });
        messageAxios = new AxiosMessage({
            baseURL: "https://tls.browserleaks.com/json",
        });
    });

    test.concurrent("Teste request tls has akamai token", async () => {
        const tlsResponse = messageTls.request({});

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(akamaiHash),
            expect(tlsResponse).resolves.toHaveProperty(akamaiHash, expect.stringMatching(/\w{32}/)),
        ]);
    });

    test.concurrent("Teste request without TLS has akamai token", async () => {
        const tlsResponse = messageAxios.request({});

        await Promise.all([
            expect(tlsResponse).resolves.toHaveProperty(akamaiHash),
            expect(tlsResponse).resolves.toHaveProperty(akamaiHash, expect.stringMatching("")),
        ]);
    });
});
