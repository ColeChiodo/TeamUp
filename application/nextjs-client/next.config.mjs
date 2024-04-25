/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*', // Matches all requests
                destination: 'http://107.20.59.192:4000/v1/:path*', // Proxy to Backend
            },
        ]
    },
};

module.exports = nextConfig;