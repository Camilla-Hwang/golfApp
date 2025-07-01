import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.changigolfclub.org.sg',
      },
      {
        protocol: 'https',
        hostname: 'www.orchidclub.com',
      },
      {
        protocol: 'https',
        hostname: 'www.palmresort.com',
      },
    ],
  }
};

export default nextConfig;
