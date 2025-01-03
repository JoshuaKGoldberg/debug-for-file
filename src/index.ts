import debug from "debug";

import { filePathToNamespace } from "./filePathToNamespace.js";

export function debugForFile(filePath: string) {
	return debug(filePathToNamespace(filePath));
}
