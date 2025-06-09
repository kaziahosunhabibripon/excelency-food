/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next/dist/types";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
