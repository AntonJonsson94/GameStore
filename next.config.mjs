/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   experimental: {
      serverComponentsExternalPackages: ["mongoose"],
   },
   images: {
       remotePatterns: [
           {
               protocol: 'https',
               hostname: 'media.rawg.io',
           },
           {
               protocol: 'https',
               hostname: 'images.igdb.com',
           },
           {
               protocol: 'https',
               hostname: 'cdn.cloudflare.steamstatic.com',
           },
       ],
   },
};

export default nextConfig;
