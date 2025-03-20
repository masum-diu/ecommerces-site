/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudinary.com",
      },
    ],
    unoptimized: true,
  },
};
module.exports = nextConfig;
