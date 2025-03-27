import { TlsMessage } from "src";
import { TlsAxiosRequestParser } from "src/parser/TlsAxiosRequestParser";

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
        expect(TlsAxiosRequestParser["getTimeInSeconds"](await messageTls["getNewOptions"]({
            timeout: 1000,
        }))).toBe(1);
    });

    test.concurrent("Test 0 seconds", async () => {
        expect(TlsAxiosRequestParser["getTimeInSeconds"](await messageTls["getNewOptions"]({
            timeout: 0,
        }))).toBe(0);
    });

    test.concurrent("Test undefined", async () => {
        expect(TlsAxiosRequestParser["getTimeInSeconds"](await messageTls["getNewOptions"]({
            timeout: undefined,
        }))).toBeUndefined();
    });

    test.concurrent("Teste 2 second override 10 Seconds", async () => {
        messageTls.setDefaultOptions({
            ...messageTls.getDefaultOptions(),
            timeout: 10_000,
        });

        expect(TlsAxiosRequestParser["getTimeInSeconds"](await messageTls["getNewOptions"]({
            timeout: 2000,
        }))).toBe(2);
    });

    test.concurrent("Test 10 seconds", async () => {
        messageTls["config"]["timeout"] = 10_000;

        expect(TlsAxiosRequestParser["getTimeInSeconds"](await messageTls["getNewOptions"]({
        }))).toBe(10);
    });

    test.concurrent("Test Test float timeout", async () => {
        messageTls["config"]["timeout"] = 100;

        expect(TlsAxiosRequestParser["getTimeInSeconds"](await messageTls["getNewOptions"]({
            timeout: messageTls["config"]["timeout"],
        }))).toBe(0);
    });

    test.concurrent("Test Test float 1.5 to 2", async () => {
        expect(TlsAxiosRequestParser["getTimeInSeconds"](await messageTls["getNewOptions"]({
            timeout: 1500,
        }))).toBe(1);
    });
});
