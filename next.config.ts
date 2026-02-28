import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/dashboard',         // user ka requested path
        destination: '/dashboard/inbox', // redirect target
        permanent: false,             // false = temporary redirect (307)
      },
    ];
  },
};

export default nextConfig;
