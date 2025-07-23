/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  eslint: {
    // During build, warnings shouldn't fail the build
    ignoreDuringBuilds: true,
  },
  // Add webpack configuration to increase timeout
  webpack: (config, { isServer }) => {
    // Increase chunk loading timeout to 60 seconds
    config.watchOptions = {
      ...config.watchOptions,
      aggregateTimeout: 300,
      poll: 1000,
    };

    // Increase the timeout for chunk loading
    config.output.chunkLoadTimeout = 60000; // 60 seconds

    return config;
  },
  // Add this to handle dynamic pages
  experimental: {
    // This helps with pages that can't be statically generated
    appDir: true,
    serverComponents: true,
  },
  // This tells Next.js which paths should not be statically generated
  unstable_excludeFiles: ['**/node_modules/@lottiefiles/**/*'],
};

export default nextConfig;
