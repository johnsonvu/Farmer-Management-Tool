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
    "url": "/_nuxt/app.e534d9d3f603fa5a0a86.js",
    "revision": "af4dc808d4bfd76c60d946228b7ffd24"
  },
  {
    "url": "/_nuxt/common.7c43a0be4069238b9b0b.js",
    "revision": "59a9f3484e12722976ec61e2de15831b"
  },
  {
    "url": "/_nuxt/layouts/default.ce12570058a6b64588d7.js",
    "revision": "72f2049e15029b0ed5b9c39a02756fe2"
  },
  {
    "url": "/_nuxt/manifest.ee1bf8d3637c21459cd8.js",
    "revision": "9da73fe8a8641a548666542a5af98b74"
  },
  {
    "url": "/_nuxt/pages/animals\\index.8715583da84cdd94aaea.js",
    "revision": "b4c3324242f23bc925df36c0dc049200"
  },
  {
    "url": "/_nuxt/pages/index.f67f32479dcc9e3a4024.js",
    "revision": "bd26cfa7894ce76cf9917099e821388c"
  },
  {
    "url": "/_nuxt/pages/users\\_username\\index.2ca46e8084fe6f6fbbc9.js",
    "revision": "6810617f73ded244c9a8ce5b91dc42bc"
  },
  {
    "url": "/_nuxt/pages/users\\_username\\update.7758ed3978a11f83503b.js",
    "revision": "0af092032656d915321cdb5c668d2012"
  },
  {
    "url": "/_nuxt/pages/users\\add.889791405941f4dffaa6.js",
    "revision": "6d576f0fe5ae4b13449f5f0a3f07d036"
  },
  {
    "url": "/_nuxt/pages/users\\index.8fd0a28bc3bbcb23dcff.js",
    "revision": "da0fe9c59769d1cc73f0ff1b6fe1e090"
  },
  {
    "url": "/_nuxt/pages/worker\\feed-animals.c601982051bde9d939c1.js",
    "revision": "926c60432b4db1a66f11b9985b619a16"
  },
  {
    "url": "/_nuxt/pages/worker\\harvest-animals.b2be940b86ce63c464e0.js",
    "revision": "17b17dbfc175792857bdd8f967463c9f"
  },
  {
    "url": "/_nuxt/pages/worker\\index.6509d9fd8fbfe377a4d2.js",
    "revision": "d53c145bcf088d44cc2fd928f968e73d"
  },
  {
    "url": "/_nuxt/pages/worker\\manage-animals.dc4594afc04b1481d591.js",
    "revision": "23a440e260e5e05866e7e359d3a29171"
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
