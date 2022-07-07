/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async redirects() {
    return [{ source: "/", destination: "/home", permanent: true }];
  },
};
