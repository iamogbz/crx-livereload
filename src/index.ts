import {
    getEntries,
    getExtensionDirectory,
    getExtensionInfo,
    reloadExtensionTab,
} from "chrome";

const getFiles = async (dir: DirectoryEntry): Promise<File[]> => {
    const entries = (await getEntries(dir)).filter(e => e.name[0] !== ".");
    const tasks: Array<Promise<File[] | File>> = entries.map(e =>
        e.isDirectory
            ? getFiles(e as DirectoryEntry)
            : new Promise(resolve => (e as FileEntry).file(resolve)),
    );
    return [].concat(...(await Promise.all(tasks)));
};

const getDirectoryTimestamp = (dir: DirectoryEntry) =>
    getFiles(dir).then(files => files.map(f => f.name + f.lastModified).join());

export const watchChanges = (dir: DirectoryEntry, lastTimestamp?: string) => {
    getDirectoryTimestamp(dir).then(timestamp => {
        if (!lastTimestamp || lastTimestamp === timestamp) {
            setTimeout(() => watchChanges(dir, timestamp), 1000);
        } else {
            reloadExtensionTab();
        }
    });
};

(async () => {
    const extInfo = (await getExtensionInfo()) as chrome.management.ExtensionInfo;
    if (extInfo.installType === "development") {
        getExtensionDirectory().then(watchChanges);
    }
})();
