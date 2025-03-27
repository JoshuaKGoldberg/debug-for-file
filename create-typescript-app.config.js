import {
	blockCodecov,
	blockCTATransitions,
	blockVitest,
	createConfig,
} from "../create-typescript-app/lib/index.js";

export default createConfig({
	refinements: {
		addons: [
			blockCodecov({
				env: {
					CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
				},
			}),
			blockVitest({
				coverage: {
					exclude: ["src/index.ts"],
				},
			}),
		],
		blocks: {
			add: [blockCTATransitions],
		},
	},
});
