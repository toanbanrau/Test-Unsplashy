/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["images.unsplash.com"], // Thêm miền API vào đây
  },
};

module.exports = nextConfig;
