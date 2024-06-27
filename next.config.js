/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tigc-chanakya.s3.amazonaws.com",
      "assets.ajio.com",
      "assets.myntassets.com",
      "*.googleusercontent.com",
      "tigc-chanakya.s3.ap-south-1.amazonaws.com"
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
