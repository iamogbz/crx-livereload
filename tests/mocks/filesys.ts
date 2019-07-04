export const mockEntry: Entry = ({
    fullPath: "/mock/full/path",
    name: "mock-entry",
} as unknown) as Entry;

export const mockFileEntry = {
    ...mockEntry,
    file: (callback: (...args: any[]) => void) =>
        callback({ lastModified: "20190703000000" }),
    isFile: true,
} as FileEntry;

export const mockEmptyDirEntry = {
    ...mockEntry,
    createReader: () => ({
        readEntries: (callback: (...args: any[]) => void) => callback([]),
    }),
    isDirectory: true,
} as DirectoryEntry;

export const mockDirEntry: DirectoryEntry = {
    ...mockEmptyDirEntry,
    createReader: () => ({
        readEntries: (callback: (...args: any[]) => void) =>
            callback([mockFileEntry, mockEmptyDirEntry]),
    }),
    isDirectory: true,
};
