import * as chromeUtils from "chrome";
import * as fileUtils from "filesys";
import { mockExtInfo } from "./mocks/chrome";
import { mockDirEntry } from "./mocks/filesys";

const getExtDirSpy = jest.spyOn(chromeUtils, "getExtensionDirectory");
const getExtInfoSpy = jest.spyOn(chromeUtils, "getExtensionInfo");
const watchChangesSpy = jest.spyOn(fileUtils, "watchChanges");

afterEach(jest.clearAllMocks);

describe("entry", () => {
    it("watches changes in development mode", async () => {
        getExtDirSpy.mockResolvedValueOnce(mockDirEntry);
        getExtInfoSpy.mockResolvedValueOnce(mockExtInfo);
        await (await import("index")).initializing;
        expect(watchChangesSpy).toHaveBeenCalledWith(
            mockDirEntry,
            chromeUtils.reloadExtensionTab,
        );
    });

    it("does not watch changes when not in development mode", async () => {
        getExtDirSpy.mockResolvedValueOnce(mockDirEntry);
        getExtInfoSpy.mockResolvedValueOnce({
            ...mockExtInfo,
            installType: "production",
        });
        await (await import("index")).initializing;
        expect(watchChangesSpy).not.toHaveBeenCalled();
    });
});
