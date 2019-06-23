export const getExtensionInfo = () =>
    new Promise(resolve => chrome.management.getSelf(resolve));

export const getExtensionDirectory = () =>
    new Promise(resolve => chrome.runtime.getPackageDirectoryEntry(resolve));

export const getEntries = (dir: DirectoryEntry) =>
    new Promise(resolve => dir.createReader().readEntries(resolve));

export const reloadCurrentTab = () =>
    new Promise(resolve =>
        chrome.tabs.query({ active: true, currentWindow: true }, resolve),
    ).then(([tab]) => {
        if (tab) chrome.tabs.reload(tab.id);
        chrome.runtime.reload();
    });
