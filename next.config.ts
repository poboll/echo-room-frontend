/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8082/:path*', // 代理到后端
            },
            {
                source: '/ws/:path*',
                destination: 'http://localhost:8082/ws/:path*', // WebSocket代理
            },
        ];
    },
};

module.exports = nextConfig;
