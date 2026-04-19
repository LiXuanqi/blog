import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.githubassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "code.visualstudio.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/posts",
        permanent: true,
      },
      {
        source: "/blogs/:path*",
        destination: "/posts/:path*",
        permanent: true,
      },
      {
        source: "/:lang/blogs",
        destination: "/:lang/posts",
        permanent: true,
      },
      {
        source: "/:lang/blogs/:path*",
        destination: "/:lang/posts/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
