import { createFixture } from "fs-fixture";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import { filePathToNamespace } from "./filePathToNamespace.js";

describe("filePathToNamespace", () => {
	it("generates a namespace with just the filePath when readPackageUpSync doesn't resolve a package.json", async () => {
		await using fixture = await createFixture({
			"abc/def/file.js": 'console.log("Hello world")',
		});

		const actual = filePathToNamespace("abc/def", fixture.path);

		expect(actual).toBe("abc:def");
	});

	it("generates a namespace including the package name when readPackageUpSync resolves a package.json", async () => {
		await using fixture = await createFixture({
			"abc/def.js": 'console.log("Hello world")',
			"abc/package.json": JSON.stringify({ name: "xyz" }),
		});

		const actual = filePathToNamespace("abc/def.js", fixture.path);

		expect(actual).toBe("xyz:def");
	});

	it("resolves a file:// URL to its package path when given import.meta.url", async () => {
		await using fixture = await createFixture({
			"package.json": JSON.stringify({ name: "root" }),
			"repo/pkg/lib/sub/file.js": 'console.log("Hello world")',
			"repo/pkg/package.json": JSON.stringify({ name: "xyz" }),
		});

		const actual = filePathToNamespace(
			path.join(fixture.path, "repo/pkg/lib/sub/file.js"),
		);

		expect(actual).toBe("xyz:sub:file");
	});
});
