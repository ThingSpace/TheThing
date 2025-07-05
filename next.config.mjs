// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'));

// Cool Security Headers.
const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Referrer-Policy',
		value: 'strict-origin-when-cross-origin',
	},
];

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: false,
	typescript: { ignoreBuildErrors: true },
	eslint: { ignoreDuringBuilds: true },
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
	async redirects() {
		return [
			{
				source: '/',
				has: [
					{
						type: 'cookie',
						key: 'token',
					},
				],
				permanent: false,
				destination: '/app',
			},
		];
	},
};
export default config;
