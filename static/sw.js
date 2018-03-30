importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/app.e7cca9d139f830b8933a.js",
    "revision": "c66184ea8404c0ba819c35727053c11a"
  },
  {
    "url": "/_nuxt/common.0e539e04e67542a0c8df.js",
    "revision": "5565c98890c01ca1abee10562da0648b"
  },
  {
    "url": "/_nuxt/layouts/default.e000a300410bb3afd552.js",
    "revision": "81c84671346f239de9a59876668df5f3"
  },
  {
    "url": "/_nuxt/manifest.7b694c1005e612c458af.js",
    "revision": "060d842adc07860953ff396178c78516"
  },
  {
    "url": "/_nuxt/pages/animals\\index.0dfcbc54132d989567a2.js",
    "revision": "4b6df10b3a9702705d6aaf6c8826cd42"
  },
  {
    "url": "/_nuxt/pages/index.c2f2d2defd15a7f4f043.js",
    "revision": "b744d48d562a7bf5ad405f21b075b79d"
  },
  {
    "url": "/_nuxt/pages/login\\index.959ea502d95823bd1456.js",
    "revision": "79a4a456b752d2044042109f2ed3c704"
  },
  {
    "url": "/_nuxt/pages/manager\\index.07ba8d8ed50033861edf.js",
    "revision": "b24701fccfe66aee9e5bf7137ef00807"
  },
  {
    "url": "/_nuxt/pages/manager\\manage-farmers.d64237abb65bed17ed93.js",
    "revision": "5ac269b60a14c5a11bbf7ae52ac8f99b"
  },
  {
    "url": "/_nuxt/pages/product\\index.b2e71ca5cfa7751ac6ef.js",
    "revision": "8295ce3d7185d045898cffa3df390bd5"
  },
  {
    "url": "/_nuxt/pages/stakeholder\\index.6245dc0b952e53f1e025.js",
    "revision": "85f2973229373b814decb461dd53e5b2"
  },
  {
    "url": "/_nuxt/pages/stats\\index.9323181a3bb629102f72.js",
    "revision": "e3818c92fc7a2f1bd8edeb07edb0a206"
  },
  {
    "url": "/_nuxt/pages/users\\_username\\index.8b65bcbca9e5987961f3.js",
    "revision": "e328d3a001f9dc620d44234e197ba6ea"
  },
  {
    "url": "/_nuxt/pages/users\\_username\\update.a0ffc7415edcf81a3d57.js",
    "revision": "98750ff9f97dc9d0858cf7f0b5d168a1"
  },
  {
    "url": "/_nuxt/pages/users\\add.d0646428bbb9f2e56df8.js",
    "revision": "d90062fbb8e9b821f3e1e61a1c1ed936"
  },
  {
    "url": "/_nuxt/pages/users\\index.3cf448b7c2a94494cc01.js",
    "revision": "03174e59f74718c4f05f21ac69455c4b"
  },
  {
    "url": "/_nuxt/pages/worker\\feed-animals.eafe1710a07473577b2b.js",
    "revision": "a08921916a9942e12e0e1366178feb11"
  },
  {
    "url": "/_nuxt/pages/worker\\harvest-animals.2536fa59ea3ca9331e4d.js",
    "revision": "fdc02fe300c00f2124153a418b5de53c"
  },
  {
    "url": "/_nuxt/pages/worker\\index.2a95edd711ca8e97bd52.js",
    "revision": "b7ccfd8e23b012360067fe314e481196"
  },
  {
    "url": "/_nuxt/pages/worker\\manage-animals.3b3b81dafb2a73356e69.js",
    "revision": "57cd830696abe8e1f05c61341112bab6"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "304demoproject_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
