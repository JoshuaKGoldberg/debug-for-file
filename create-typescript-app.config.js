import {
	blockCodecov,
	blockCTATransitions,
	blockVitest,
	createConfig,
} from "create-typescript-app";

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
