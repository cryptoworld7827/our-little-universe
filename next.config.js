/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // we use base64/localStorage images, no remote optimization needed
  },
};

module.exports = nextConfig;
