/** @type {import('next').NextConfig} */
const OLD_PATHS = [
  '/Test',
  '/InteractionFollowers',
  '/InteractionPriceList',
  '/WebsiteDesigning',
  '/WebsitePriceList',
  '/DigitalMarketing',
  '/DigitalPriceList',
  '/ContentWriting',
  '/ContentPriceList',
  '/AboutUs',
];

const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return OLD_PATHS.map((source) => ({ source, destination: '/', permanent: true }));
  },
  async headers() {
    return [
      {
        source: '/service-worker.js',
        headers: [{ key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
