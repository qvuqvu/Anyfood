/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "aws-s3-nodejs-reviewfood.s3.us-east-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
