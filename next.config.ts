import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blogs',
        permanent: false, // Use true for 301 redirect, false for 302
      },
    ]
  },
};

export default nextConfig;
