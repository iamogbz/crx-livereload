import * as chrome from "sinon-chrome";

import { log } from "chrome";
import { SinonStub } from "sinon";

jest.spyOn(console, "log");
expect.extend({
    stubToHaveBeenCalledWith: (stub: SinonStub, ...args: any[]) => {
        const pass = stub.withArgs(...args).calledOnce;
        const prettyArgs = JSON.stringify(args).slice(1, -1);
        const message = `${stub} ${
            pass ? "" : "not "
        }called with (${prettyArgs})`;
        return { pass, message };
    },
});

describe("chrome", () => {
    afterEach(chrome.flush);
    describe("log", () => {
        const mockArgs = [1, "2", { three: "III" }, [4, "four", "IV", 4.0]];

        it("logs to console in background", () => {
            log(...mockArgs);
            // tslint:disable-next-line: no-console
            expect(console.log).toHaveBeenCalledWith(...mockArgs);
        });

        it("logs to console in activeTab", () => {
            log(...mockArgs);
            expect(chrome.tabs.executeScript.firstCall.args).toMatchSnapshot();
        });
    });
});
