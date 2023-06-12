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
  },
  env:{
    NEXTAUTH_SECRET:"",
    GOOGLE_UID: "162472437137-a6lmosggct31h1dud6anq74kd5qlq2hd.apps.googleusercontent.com",
    GOOGLE_SECRET:"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"
  }
};
module.exports = nextConfig;
