/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
