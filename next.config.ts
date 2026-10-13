import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/Projets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
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
