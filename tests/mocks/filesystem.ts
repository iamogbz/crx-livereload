export const mockEntry = { name: "mock-entry", fullPath: "/mock/full/path" };

export const mockFileEntry: FileEntry = ({
    ...mockEntry,
    file: (callback: (...args: any[]) => void) =>
        callback({ lastModified: "20190703000000" }),
    isFile: true,
} as unknown) as FileEntry;

export const mockDirEntry: DirectoryEntry = ({
    ...mockEntry,
    createReader: () => ({
        readEntries: (callback: (...args: any[]) => void) =>
            callback([mockFileEntry]),
    }),
    isDirectory: true,
} as unknown) as DirectoryEntry;
