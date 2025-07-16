/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour améliorer les performances
  experimental: {
    optimizePackageImports: ['@/components', '@/data'],
  },
  
  // Compression
  compress: true,
  
  // Optimisation du bundle
  webpack: (config, { dev, isServer }) => {
    // Optimisation uniquement en production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          components: {
            test: /[\\/]src[\\/]components[\\/]/,
            name: 'components',
            priority: -5,
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
