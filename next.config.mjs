/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
};

export default nextConfig;
