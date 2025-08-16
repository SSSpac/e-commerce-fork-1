import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

export default nextConfig;
