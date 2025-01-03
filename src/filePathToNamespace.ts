import * as path from "node:path";
import { readPackageUpSync } from "read-package-up";

import { generateNamespace } from "./generateNamespace.js";

export function filePathToNamespace(filePath: string) {
	const packageUp = readPackageUpSync({
		cwd: path.dirname(filePath),
	});

	if (!packageUp) {
		return generateNamespace(filePath);
	}

	const filePathRelative = path.relative(
		path.dirname(packageUp.path),
		filePath,
	);

	return generateNamespace(filePathRelative, packageUp.packageJson.name);
}
