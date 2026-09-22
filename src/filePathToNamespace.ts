import * as fs from "node:fs";
import { findPackageJSON } from "node:module";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { generateNamespace } from "./generateNamespace.js";

export function filePathToNamespace(filePath: string) {
	const resolved = filePath.startsWith("file://")
		? fileURLToPath(filePath)
		: filePath;

	const packageJsonPath = findPackageJSON(".", pathToFileURL(resolved));

	if (
		packageJsonPath === undefined ||
		path.basename(packageJsonPath) !== "package.json"
	) {
		return generateNamespace(resolved);
	}

	const filePathRelative = path.relative(
		path.dirname(packageJsonPath),
		resolved,
	);

	return generateNamespace(filePathRelative, readPackageName(packageJsonPath));
}

function readPackageName(packageJsonPath: string) {
	const contents = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as {
		name?: string;
	};

	return contents.name;
}
