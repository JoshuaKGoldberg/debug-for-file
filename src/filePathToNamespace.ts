import * as fs from "node:fs";
import { findPackageJSON } from "node:module";
import * as path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { generateNamespace } from "./generateNamespace.js";

export function filePathToNamespace(filePath: string) {
	const resolved = filePath.startsWith("file:")
		? fileURLToPath(filePath)
		: filePath;

	const packageJsonPath = findClosestPackageJson(resolved);

	if (!packageJsonPath) {
		return generateNamespace(resolved);
	}

	const filePathRelative = path.relative(
		path.dirname(packageJsonPath),
		resolved,
	);

	return generateNamespace(filePathRelative, readPackageName(packageJsonPath));
}

function findClosestPackageJson(resolved: string) {
	let found;

	try {
		// Passing the file as `base` rather than as `specifier` keeps this working
		// for paths that don't exist on disk, which `specifier` would reject.
		found = findPackageJSON(".", pathToFileURL(resolved));
	} catch {
		return undefined;
	}

	// Node resolves to the specifier itself, rather than `undefined` as
	// documented, when no package.json exists in any parent directory.
	return found !== undefined && path.basename(found) === "package.json"
		? found
		: undefined;
}

function readPackageName(packageJsonPath: string) {
	const contents = JSON.parse(fs.readFileSync(packageJsonPath, "utf8")) as {
		name?: string;
	};

	return contents.name;
}
