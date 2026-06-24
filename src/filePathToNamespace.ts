import { up } from "empathic/package";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { generateNamespace } from "./generateNamespace.js";

export function filePathToNamespace(filePath: string, cwd = process.cwd()) {
	const barePath = filePath.startsWith("file:")
		? fileURLToPath(filePath)
		: filePath;
	const resolved = !path.isAbsolute(barePath)
		? path.join(
				cwd,
				barePath.startsWith("file:") ? fileURLToPath(barePath) : barePath,
			)
		: barePath;

	const manifestPath = up({ cwd: resolved });

	if (!manifestPath) {
		return generateNamespace(barePath);
	}

	const filePathRelative = path.relative(path.dirname(manifestPath), resolved);
	const manifest = safeParseManifest(manifestPath);

	return generateNamespace(filePathRelative, manifest?.name);
}

function safeParseManifest(filePath: string): undefined | { name?: string } {
	try {
		return JSON.parse(fs.readFileSync(filePath, "utf8")) as never;
	} catch {
		return undefined;
	}
}
