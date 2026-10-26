import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  outputFileTracingIncludes: {
    "/og/*": ["./src/assets/*.otf", "./src/tokens.css"],
  },
  async headers() {
    return ["/test", "/result", "/api/:path*"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};
export default nextConfig;
