import debug from "debug";

import { generateNamespace } from "./generateNamespace.js";

export function debugForFile(filePath: string) {
	return debug(generateNamespace(filePath));
}
