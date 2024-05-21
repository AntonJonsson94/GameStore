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
        hostname: '**', 
        port: '', 
        pathname: '/**', 
      },
       ],
   },
};

export default nextConfig;
