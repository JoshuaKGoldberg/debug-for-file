import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { filePathToNamespace } from "./filePathToNamespace.js";

const mockFindPackageJSON = vi.fn();

vi.mock("node:module", () => ({
	get findPackageJSON() {
		return mockFindPackageJSON;
	},
}));

let fixtures: string;

function writeFixture(name: string, contents: unknown) {
	const directory = path.join(fixtures, name);

	fs.mkdirSync(directory, { recursive: true });

	const packageJsonPath = path.join(directory, "package.json");

	fs.writeFileSync(packageJsonPath, JSON.stringify(contents));

	return packageJsonPath;
}

beforeAll(() => {
	fixtures = fs.mkdtempSync(path.join(os.tmpdir(), "debug-for-file-"));
});

afterAll(() => {
	fs.rmSync(fixtures, { force: true, recursive: true });
});

describe("filePathToNamespace", () => {
	it("generates a namespace with just the filePath when findPackageJSON doesn't resolve a package.json", () => {
		mockFindPackageJSON.mockReturnValueOnce(undefined);

		const actual = filePathToNamespace("abc/def");

		expect(actual).toBe("abc:def");
	});

	it("generates a namespace with just the filePath when findPackageJSON throws", () => {
		mockFindPackageJSON.mockImplementationOnce(() => {
			throw new Error("ERR_MODULE_NOT_FOUND");
		});

		const actual = filePathToNamespace("abc/def");

		expect(actual).toBe("abc:def");
	});

	it("generates a namespace with just the filePath when findPackageJSON resolves a path that isn't a package.json", () => {
		mockFindPackageJSON.mockReturnValueOnce("/repo/pkg/lib/sub/file.js");

		const actual = filePathToNamespace("abc/def");

		expect(actual).toBe("abc:def");
	});

	it("generates a namespace including the package name when findPackageJSON resolves a package.json", () => {
		const packageJsonPath = writeFixture("named", { name: "xyz" });
		mockFindPackageJSON.mockReturnValueOnce(packageJsonPath);

		const actual = filePathToNamespace(path.join(fixtures, "named", "def.js"));

		expect(actual).toBe("xyz:def");
	});

	it("generates a namespace with just the relative filePath when the resolved package.json has no name", () => {
		const packageJsonPath = writeFixture("unnamed", { private: true });
		mockFindPackageJSON.mockReturnValueOnce(packageJsonPath);

		const actual = filePathToNamespace(
			path.join(fixtures, "unnamed", "def.js"),
		);

		expect(actual).toBe("def");
	});

	it("resolves a file:// URL to its package path when given import.meta.url", () => {
		const packageJsonPath = writeFixture("url", { name: "xyz" });
		mockFindPackageJSON.mockReturnValueOnce(packageJsonPath);
		const filePath = path.join(fixtures, "url", "lib", "sub", "file.js");

		const actual = filePathToNamespace(pathToFileURL(filePath).href);

		expect(mockFindPackageJSON).toHaveBeenCalledWith(
			".",
			pathToFileURL(filePath),
		);
		expect(actual).toBe("xyz:sub:file");
	});
});
