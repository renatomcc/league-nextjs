/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "logosmarcas.net",
      "ddragon.leagueoflegends.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
};

module.exports = nextConfig;
