/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/items/:id",
        destination: "/products/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
