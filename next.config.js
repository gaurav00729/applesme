/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // lightweight but no dynamic routes & api support
  // output: "standalone", // bulkier but supports dynamic routes & api
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
