import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow all images from the web
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
