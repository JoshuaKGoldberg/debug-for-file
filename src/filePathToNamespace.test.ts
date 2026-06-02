import { pathToFileURL } from "node:url";
import { describe, expect, it, vi } from "vitest";

import { filePathToNamespace } from "./filePathToNamespace.js";

const mockReadPackageUpSync = vi.fn();

vi.mock("read-package-up", () => ({
	get readPackageUpSync() {
		return mockReadPackageUpSync;
	},
}));

describe("filePathToNamespace", () => {
	it("generates a namespace with just the filePath when readPackageUpSync doesn't resolve a package.json", () => {
		mockReadPackageUpSync.mockReturnValueOnce(undefined);

		const actual = filePathToNamespace("abc/def");

		expect(actual).toBe("abc:def");
	});

	it("generates a namespace including the package name when readPackageUpSync resolves a package.json", () => {
		mockReadPackageUpSync.mockReturnValueOnce({
			packageJson: { name: "xyz" },
			path: "abc/package.json",
		});

		const actual = filePathToNamespace("abc/def");

		expect(actual).toBe("xyz:def");
	});

	it("resolves a file:// URL to its package path when given import.meta.url", () => {
		mockReadPackageUpSync.mockReturnValueOnce({
			packageJson: { name: "xyz" },
			path: "/repo/pkg/package.json",
		});

		const actual = filePathToNamespace(
			pathToFileURL("/repo/pkg/lib/sub/file.js").href,
		);

		expect(mockReadPackageUpSync).toHaveBeenCalledWith({
			cwd: "/repo/pkg/lib/sub",
		});
		expect(actual).toBe("xyz:sub:file");
	});
});
