
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //     hmrRefreshes: true
  //   }
  // },
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "loom-and-lume.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "https://unsplash.com" }
     
    ],
  },
};

export default nextConfig;
