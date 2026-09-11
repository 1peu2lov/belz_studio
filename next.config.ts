import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/a-propos",
        destination: "/le-studio",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "belzstudio.fr" }],
        destination: "https://www.belzstudio.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
