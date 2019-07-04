import * as chromeUtils from "chrome";
import { watchChanges } from "filesys";
import {
    mockDirEntry,
    mockEmptyDirEntry,
    mockFileEntry,
} from "./mocks/filesys";

const logSpy = jest.spyOn(chromeUtils, "log");
const getEntriesSpy = jest.spyOn(chromeUtils, "getEntries");

it("watches for changes to directory", async () => {
    const mockEntries = [mockFileEntry, mockEmptyDirEntry];
    getEntriesSpy
        .mockResolvedValueOnce(mockEntries)
        .mockResolvedValueOnce(mockEntries)
        .mockResolvedValueOnce(mockEntries)
        .mockResolvedValueOnce([mockFileEntry]);
    await new Promise(resolve => watchChanges(mockDirEntry, resolve, 0));
    expect(logSpy.mock.calls).toMatchSnapshot();
});
