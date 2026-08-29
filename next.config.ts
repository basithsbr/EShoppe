import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', 
  basePath: '/EShoppe', 
  trailingSlash: true,
  images: {
    unoptimized: true, 
  },
  async rewrites() {
    return [
      {
        // Now that SSR is active, your proxy rewrite works perfectly!
        source: "/api/products",
        destination: "http://localhost:8000/products",
      },
    ];
  },
};

export default nextConfig;
