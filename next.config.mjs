/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "cdn.cloudflare.steamstatic.com"
        }]
    },
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
};

export default nextConfig;
