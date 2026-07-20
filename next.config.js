/** @type {import('next').NextConfig} */

const nextConfig = { serverExternalPackages: ["@prisma/client", "mariadb"] };

module.exports = nextConfig;
