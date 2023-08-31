import { TlsMessage } from "src";

describe("Tls Allow Redirect", () => {
    const tlsUrl = "http://localhost:8082";
    test.concurrent("Allow Redirect default false", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: tlsUrl,
                allowRedirect: false,
            },
        });
        expect(messageTls["getAllowRedirect"]({})).toBe(false);
    });

    test.concurrent("Redirect url override true", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: tlsUrl,
                allowRedirect: false,
            },
        });
        expect(messageTls["getAllowRedirect"]({ tls: { allowRedirect: true } })).toBe(true);
    });

    test.concurrent("Redirect default is true", async () => {
        const messageTls = new TlsMessage({
            tls: {
                url: tlsUrl,
                allowRedirect: undefined,
            },
        });
        expect(messageTls["getAllowRedirect"]({ tls: { allowRedirect: undefined } })).toBe(true);
    });
});
