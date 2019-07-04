import {
    getExtensionDirectory,
    getExtensionInfo,
    reloadExtensionTab,
} from "chrome";
import { watchChanges } from "filesys";

export const initializing = (async () => {
    const extInfo = await getExtensionInfo();
    if (extInfo.installType === "development") {
        watchChanges(await getExtensionDirectory(), reloadExtensionTab);
    }
})();
