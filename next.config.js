/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/:slug(deno|github)", destination: "/:slug/home", permanent: true },
      { source: "/:slug(deno|github)/blob", destination: "/:slug/home", permanent: true },
    ];
  },
};
