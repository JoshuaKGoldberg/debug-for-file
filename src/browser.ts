import debug from "debug";

import { generateNamespace } from "./generateNamespace.ts";

export function debugForFile(filePath: string) {
	return debug(generateNamespace(filePath));
}
