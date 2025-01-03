import { describe, expect, test } from "vitest";

import { generateNamespace } from "./generateNamespace.js";

describe("generateNamespace", () => {
	test.each([
		["dist/index.js", undefined, "index"],
		["lib/index.js", undefined, "index"],
		["src/index.js", undefined, "index"],
		["dist/index.js", "example", "example:index"],
		["lib/index.js", "example", "example:index"],
		["src/index.js", "example", "example:index"],
		["lib/index.cjs", "example", "example:index"],
		["lib/index.cts", "example", "example:index"],
		["lib/index.jsx", "example", "example:index"],
		["lib/index.mjs", "example", "example:index"],
		["lib/index.mts", "example", "example:index"],
		["lib/index.ts", "example", "example:index"],
		["lib/index.tsx", "example", "example:index"],
		["lib/index.test.js", "example", "example:index:test"],
		["lib/abc/def.js", undefined, "abc:def"],
		["lib/abc/def.js", "example", "example:abc:def"],
		["lib/abc/def.js", "@org/example", "org:example:abc:def"],
		[
			"lib/predicates.js",
			"@typescript-eslint/type-utils",
			"typescript-eslint:type-utils:predicates",
		],
		[
			"lib/parseSettings/resolveProjectList.js",
			"@typescript-eslint/typescript-estree",
			"typescript-eslint:typescript-estree:parseSettings:resolveProjectList",
		],
	])("%s and %s becomes %s", (packageName, filePath, expected) => {
		expect(generateNamespace(packageName, filePath)).toBe(expected);
	});
});
