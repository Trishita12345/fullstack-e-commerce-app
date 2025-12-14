const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
