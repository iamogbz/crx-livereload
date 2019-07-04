import { getExtensionDirectory, getExtensionInfo } from "chrome";
import { watchChanges } from "filesystem";

(async () => {
    const extInfo = await getExtensionInfo();
    if (extInfo.installType === "development") {
        watchChanges(await getExtensionDirectory());
    }
})();
