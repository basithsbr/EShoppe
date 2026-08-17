import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  basePath: '/EShoppe', 
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
