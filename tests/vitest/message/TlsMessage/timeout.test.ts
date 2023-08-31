import { TlsMessage } from "src";

describe("Tls Message", () => {
    let messageTls: TlsMessage<unknown, unknown>;

    beforeEach(() => {
        messageTls = new TlsMessage({
            tls: {
                url: "http://localhost:8082",
            },
        });
    });

    test.concurrent("Test 1 second", async () => {
        expect(messageTls["getTimeInSeconds"]({
            timeout: 1000,
        })).toBe(1);
    });

    test.concurrent("Test 0 seconds", async () => {
        expect(messageTls["getTimeInSeconds"]({
            timeout: 0,
        })).toBe(0);
    });

    test.concurrent("Test undefined", async () => {
        expect(messageTls["getTimeInSeconds"]({
            timeout: undefined,
        })).toBeUndefined();
    });

    test.concurrent("Teste 2 second override 10 Seconds", async () => {
        messageTls["config"]["timeout"] = 10_000;

        expect(messageTls["getTimeInSeconds"]({
            timeout: 2000,
        })).toBe(2);
    });

    test.concurrent("Test 10 seconds", async () => {
        messageTls["config"]["timeout"] = 10_000;

        expect(messageTls["getTimeInSeconds"]({
            timeout: undefined,
        })).toBe(10);
    });

    test.concurrent("Test Test float timeout", async () => {
        messageTls["config"]["timeout"] = 100;

        expect(messageTls["getTimeInSeconds"]({
            timeout: undefined,
        })).toBe(0);
    });
});
