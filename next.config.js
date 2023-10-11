/** @type {import('next').NextConfig} */
const nextConfig = {
  //   basePath: "/posts",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
