import {
    getExtensionDirectory,
    getExtensionInfo,
    reloadCurrentTab,
} from "chrome";

const getFiles = (dir: DirectoryEntry): Promise<File[]> =>
    new Promise(dir.createReader().readEntries).then(entries =>
        Promise.all(
            entries
                .filter(e => e.name[0] !== ".")
                .map(e =>
                    e.isDirectory
                        ? getFiles(e as DirectoryEntry)
                        : new Promise(resolve =>
                              (e as FileEntry).file(resolve),
                          ),
                ),
        ).then((files: Array<File[] | File>) => [].concat(...files)),
    );

const getDirectoryTimestamp = (dir: DirectoryEntry) =>
    getFiles(dir).then(files => files.map(f => f.name + f.lastModified).join());

export const watchChanges = (dir: DirectoryEntry, lastTimestamp?: string) => {
    getDirectoryTimestamp(dir).then(timestamp => {
        if (!lastTimestamp || lastTimestamp === timestamp) {
            setTimeout(() => watchChanges(dir, timestamp), 1000);
        } else {
            reloadCurrentTab();
        }
    });
};

(async () => {
    const extInfo = await getExtensionInfo();
    if (extInfo.installType === "development") {
        getExtensionDirectory().then(watchChanges);
    }
})();
