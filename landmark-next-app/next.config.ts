import { MAX_LANDMARK_FILE_SIZE_MB } from "@/features/landmarksViewAndHomePage/constants/createLandmarkConstants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // logging: {
  //   fetches: {
  //     hmrRefreshes: true,
  //   }
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.SERVER_API_URL || "").hostname, // invalid url value if SERVER_API_URL env var doesn't exist
        port: '',
        pathname: '/api/images/**',
        search: '',
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: `${MAX_LANDMARK_FILE_SIZE_MB}mb`,
    },
  },
};

export default nextConfig;
