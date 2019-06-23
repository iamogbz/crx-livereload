export const getExtensionInfo = () => new Promise(chrome.management.getSelf);

export const getExtensionDirectory = () =>
    new Promise(chrome.runtime.getPackageDirectoryEntry);

export const reloadCurrentTab = () =>
    new Promise(resolve =>
        chrome.tabs.query({ active: true, currentWindow: true }, resolve),
    ).then(([tab]) => {
        if (tab) chrome.tabs.reload(tab.id);
        chrome.runtime.reload();
    });
