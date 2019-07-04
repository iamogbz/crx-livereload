import { getExtensionDirectory, getExtensionInfo } from "chrome";
import { watchChanges } from "filesystem";

export const initializing = (async () => {
    const extInfo = await getExtensionInfo();
    if (extInfo.installType === "development") {
        watchChanges(await getExtensionDirectory());
    }
})();
