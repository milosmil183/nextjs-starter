/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    veteranHost: process.env.VA_HOST,
    baseApiUrl: process.env.API_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL
  }
};

module.exports = nextConfig;
