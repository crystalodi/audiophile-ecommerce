import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
		],
	},
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule: any) =>
			rule.test?.test?.(".svg")
		);

		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/i;
		}

		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

export default nextConfig;
