/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "cdn.cloudflare.steamstatic.com"
        },
        {
            protocol: "https",
            hostname:"cdn1.epicgames.com"
        },
        {
            protocol: "https",
            hostname: "originassets.akamaized.net"
        },
        {
            protocol: "https",
            hostname: "images.igdb.com"
        },
        {
            protocol: "https",
            hostname: "sttc.gamersgate.com"
        }
    ]
    },
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
};

export default nextConfig;
"https://cdn1.epicgames.com/spt-assets/69576a28f7154fe9a0dce97508da5163/firestone-online-idle-rpg-7pyzs.png"