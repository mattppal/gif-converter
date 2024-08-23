/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    experimental: {
        outputFileTracingRoot: process.cwd(),
    },
    async rewrites() {
        return [
            {
                source: '/gifs/:path*',
                destination: '/api/serveGif/:path*',
            },
        ];
    },
};

export default nextConfig;