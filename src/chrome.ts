export const log = (...args: any[]) => {
    console.log(...args); // tslint:disable-line no-console
    const code = `console.log(\`${args
        .map(v => JSON.stringify(v))
        .join("`,`")}\`)`;
    chrome.tabs.executeScript({ code });
};

export const getExtensionInfo = (): Promise<chrome.management.ExtensionInfo> =>
    new Promise(resolve => chrome.management.getSelf(resolve));

export const getExtensionDirectory = (): Promise<DirectoryEntry> =>
    new Promise(resolve => chrome.runtime.getPackageDirectoryEntry(resolve));

export const getEntries = (dir: DirectoryEntry): Promise<Entry[]> =>
    new Promise(resolve => dir.createReader().readEntries(resolve));

export const reloadExtensionTab = () =>
    new Promise(resolve =>
        chrome.tabs.query({ active: true, currentWindow: true }, resolve),
    ).then(([tab]) => {
        log("🔥 Reloading extension");
        chrome.runtime.reload();
        if (tab) {
            log("🔥 Reloading browser tab");
            chrome.tabs.reload(tab.id);
        }
    });
