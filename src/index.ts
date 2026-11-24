import debug from "debug";

import { filePathToNamespace } from "./filePathToNamespace.ts";

export function debugForFile(filePath: string) {
	return debug(filePathToNamespace(filePath));
}
