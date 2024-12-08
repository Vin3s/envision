/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true
          },
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
            priority: 20
          },
          lib: {
            test: function(module) {
              return module.size() > 50000 && /node_modules[/\\]/.test(module.identifier());
            },
            name: function(module) {
              const crypto = require('crypto');
              const hash = crypto.createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').slice(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true
          }
        }
      }
    };
    return config;
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;