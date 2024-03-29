import * as chrome from "sinon-chrome";

import {
    getEntries,
    getExtensionDirectory,
    log,
    reloadExtensionTab,
} from "chrome";
import { SinonStub } from "sinon";
import {
    mockDirEntry,
    mockEmptyDirEntry,
    mockFileEntry,
} from "./mocks/filesys";

jest.spyOn(console, "log");
expect.extend({
    stubToHaveBeenCalledWith: (stub: SinonStub, ...args: any[]) => {
        const pass = stub.withArgs(...args).calledOnce;
        const prettyArgs = JSON.stringify(args).slice(1, -1);
        const message = () =>
            `${stub} ${pass ? "" : "not "}called with (${prettyArgs})`;
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

    describe("directory", () => {
        it("gets extension directory", async () => {
            const gettingExtDir = getExtensionDirectory();
            chrome.runtime.getPackageDirectoryEntry.yield(mockDirEntry);
            expect(await gettingExtDir).toEqual(mockDirEntry);
        });

        it("gets entries in directory", async () => {
            expect(await getEntries(mockDirEntry)).toEqual([
                mockFileEntry,
                mockEmptyDirEntry,
            ]);
        });
    });

    describe("reload", () => {
        const mockTab = { id: 1 };

        it("reloads extension", async () => {
            const reloadingExtension = reloadExtensionTab();
            chrome.tabs.query
                .withArgs({ active: true, currentWindow: true })
                .yield([]);
            await reloadingExtension;
            expect(chrome.runtime.reload).stubToHaveBeenCalledWith();
            expect(chrome.tabs.reload).not.stubToHaveBeenCalledWith();
        });

        it("reloads tab", async () => {
            const reloadingExtension = reloadExtensionTab();
            chrome.tabs.query
                .withArgs({ active: true, currentWindow: true })
                .yield([mockTab]);
            await reloadingExtension;
            expect(chrome.runtime.reload).stubToHaveBeenCalledWith();
            expect(chrome.tabs.reload).stubToHaveBeenCalledWith();
        });
    });
});
