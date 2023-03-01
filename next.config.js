/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/app",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.lorem.space",
      },
    ],
  },
};
module.exports = nextConfig;
