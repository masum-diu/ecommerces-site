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
