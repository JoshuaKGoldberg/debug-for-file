import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/browser.ts", "src/index.ts"],
	fixedExtension: false,
	unbundle: true,
});
