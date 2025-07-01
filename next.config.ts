import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "static.wixstatic.com",
      "www.changigolfclub.org.sg",
      "www.orchidclub.com",
    ],
  }
};

export default nextConfig;
