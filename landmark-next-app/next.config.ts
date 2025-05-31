import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.SERVER_API_URL || "").hostname, // invalid url value if SERVER_API_URL env var doesn't exist
        port: '',
        pathname: '/api/images/**',
        search: ''
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
