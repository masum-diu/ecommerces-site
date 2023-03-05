/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        devServer: {
          hot: false,
        },
      })
    );
    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudinary.com",
      },
    ],
  },
};
module.exports = nextConfig;
