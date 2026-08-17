import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  basePath: '/EShoppe', 
  trailingSlash: true,
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
