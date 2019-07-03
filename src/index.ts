import {
    getEntries,
    getExtensionDirectory,
    getExtensionInfo,
    log,
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

export const watchChanges = (dir: DirectoryEntry, timeout: number = 1000) => {
    log(`🧨 Watching changes to files in '${dir.fullPath}'`);
    let lastTimestamp: string = null;
    const watcher = setInterval(async () => {
        const timestamp = await getDirectoryTimestamp(dir);
        if (lastTimestamp && timestamp !== lastTimestamp) {
            clearInterval(watcher);
            log(`🧨 Change detected to files in '${dir.fullPath}'`);
            reloadExtensionTab();
        }
        lastTimestamp = timestamp;
    }, timeout);
};

(async () => {
    const extInfo = await getExtensionInfo();
    if (extInfo.installType === "development") {
        watchChanges(await getExtensionDirectory());
    }
})();
