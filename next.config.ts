/** @type {import('next').NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default config;
module.exports = {
  images: {
    domains: ["api.dicebear.com", "res.cloudinary.com"],
  },
};
