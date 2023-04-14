const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Cache static assets
registerRoute(
// callback to filter JS, CSS, imgs, manifest
({ request }) => ['style', 'script', 'worker', 'image', 'manifest'].includes(request.destination),
// cache strategy, speficy storage name 
new CacheFirst ({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// registerRoute(
//   /\.(?:png|jpg|jpeg|svg|gif|ico|mp4)$/,
//   // Use the cache if it's available.
//   new CacheFirst({
//     cacheName: "image-cache",
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 3, // 3 imgs
//         maxAgeSeconds: 24 * 60 * 60 * 30, // 30 days
//       }),
//     ],
//   })
// )

// https://github.com/GoogleChrome/workbox/issues/2749
// why 2 imgs
// need to cache manifest?
// favicon.ico ? 
