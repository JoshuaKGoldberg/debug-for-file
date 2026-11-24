import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/index.ts", "src/browser.ts"],
	fixedExtension: false,
	unbundle: true,
});
