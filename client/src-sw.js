const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
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

registerRoute(
  // callback to filter JS and CSS to cache 
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
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
//   ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
//   new StaleWhileRevalidate({
//     cacheName: 'asset-cache',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// );

// TODO: Implement asset caching
  // Requirements:
    //  Caches static assets
    //  WHEN I register a service worker
    // THEN I should have my static assets pre cached "upon loading" along with subsequent pages and static assets
    // Callback example: https://developer.chrome.com/docs/workbox/modules/workbox-routing/
    // import {registerRoute} from 'workbox-routing';
    // registerRoute(matchCb, handlerCb);

// I should have my static assets pre cached "upon loading" along with subsequent pages and static assets
// use stale-while-revalidate only for static assets. This way your html, js, css, images etc. would be cached and quickly served to the user, but the data fetched dynamically from an API could still be fresh

