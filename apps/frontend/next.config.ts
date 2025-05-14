import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    output: "export",
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        unoptimized: true,
        domains: ["localhost"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**",
            },
            {
                protocol: "https",
                hostname: "strapi-production.app",
                pathname: "/uploads/**",
            },
        ],
    },

    webpack: (config) => {
        return config;
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
