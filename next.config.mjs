/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
        basePath: false,
      },
      {
        source: "/:locale(en|es|fr)/off-plan",
        destination: "/:locale/off-plan-properties-uae",
        permanent: true,
      },
      {
        source: "/:locale(en|es|fr)/off-plan/:id",
        destination: "/:locale/off-plan-properties-uae/:id",
        permanent: true,
      },
      {
        source: "/:locale(en|es|fr)/buy",
        destination: "/:locale/property-for-sale-uae",
        permanent: true,
      },
      {
        source: "/:locale(en|es|fr)/rent",
        destination: "/:locale/property-for-rent-uae",
        permanent: true,
      },
    ];
  },

  images: {
    // ✅ Allow local images through domains array
    domains: ['localhost', '127.0.0.1'],
    // ✅ Allow remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      // ✅ Simplified local patterns (domains array handles these better)
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/**",
      },
    ],
    // ✅ Enable unoptimized in development to fix local image issues
    unoptimized: process.env.NODE_ENV === 'development',
  },

  experimental: {
    typedRoutes: true,
  },

  // Transpile Swiper for ESM compatibility
  // Note: @heygen/liveavatar-web-sdk is forced to its CJS build via webpack alias below
  transpilePackages: ['swiper'],

  // Force the UMD build of the LiveAvatar SDK for browser compatibility.
  // The package has "type":"module" so webpack would otherwise treat index.cjs.js as ESM
  // and leave require() calls unpolyfilled. The UMD build has livekit-client bundled
  // inside and only needs the `events` Node polyfill (which webpack provides automatically).
  webpack: (config) => {
    const umdPath =
      process.cwd() + '/node_modules/@heygen/liveavatar-web-sdk/dist/index.umd.js';

    config.resolve.alias['@heygen/liveavatar-web-sdk'] = umdPath;

    // "type":"module" in the SDK's package.json would make webpack treat this file as ESM.
    // javascript/auto reverts to webpack's auto-detection (CJS wins because of require() calls).
    config.module.rules.push({
      test: /node_modules[\\/]@heygen[\\/]liveavatar-web-sdk[\\/]dist[\\/]index\.umd\.js$/,
      type: 'javascript/auto',
    });

    return config;
  },

  // Security Headers: Content Security Policy and other security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://wa.me",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://connect.facebook.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob: https://res.cloudinary.com https://hatscripts.github.io https://images.unsplash.com https://picsum.photos https://flagcdn.com https://www.facebook.com",
              "media-src 'self' blob: data: https://res.cloudinary.com https://gulfestates.ae https://www.gulfestates.ae",
              "font-src 'self' https://fonts.gstatic.com data:",
              "connect-src 'self' http://localhost:5000 http://localhost:5050 https://backend.gulf.smbdigitalzone.com https://backend.gulfestates.ae https://www.google-analytics.com https://www.googletagmanager.com https://static.cloudflareinsights.com https://www.facebook.com https://connect.facebook.net https://api.liveavatar.com wss://*.liveavatar.com wss://*.livekit.cloud https://*.livekit.cloud",
              "frame-src 'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com https://gulfestates.bitrix24.site https://*.bitrix24.site",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' tel: mailto:",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(self), geolocation=()'
          }
        ]
      }
    ];
  },
};

export default nextConfig;

