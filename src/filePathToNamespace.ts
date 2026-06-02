import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { readPackageUpSync } from "read-package-up";

import { generateNamespace } from "./generateNamespace.js";

export function filePathToNamespace(filePath: string) {
	const resolved = filePath.startsWith("file:")
		? fileURLToPath(filePath)
		: filePath;

	const packageUp = readPackageUpSync({
		cwd: path.dirname(resolved),
	});

	if (!packageUp) {
		return generateNamespace(resolved);
	}

	const filePathRelative = path.relative(
		path.dirname(packageUp.path),
		resolved,
	);

	return generateNamespace(filePathRelative, packageUp.packageJson.name);
}
