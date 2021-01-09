/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "748670acf379961a75a1e5098851ec00"
  },
  {
    "url": "assets/css/0.styles.6104d330.css",
    "revision": "910278ea35013ccf7c9d7b7bea0a7aa5"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.ebcd8c00.js",
    "revision": "a2ee35e86995ae556344434f2432b263"
  },
  {
    "url": "assets/js/10.52648ab9.js",
    "revision": "b42d28b08548e1726416dfa4033b5317"
  },
  {
    "url": "assets/js/11.c35bde16.js",
    "revision": "00d23c134a8fe200781b3fb9e5bffd90"
  },
  {
    "url": "assets/js/12.69db0572.js",
    "revision": "36359212339439af31ec4cd7e2c2946a"
  },
  {
    "url": "assets/js/13.123c1593.js",
    "revision": "4684742eeb953e98ab9b5b46b06ce6b2"
  },
  {
    "url": "assets/js/14.ebe30d11.js",
    "revision": "1970efe594de8c91a8a30653048745b3"
  },
  {
    "url": "assets/js/15.05dfe7ea.js",
    "revision": "2e79a61d5030698a80956ad74f7783ec"
  },
  {
    "url": "assets/js/16.43432b70.js",
    "revision": "e2efe44f095f51a707ee1656e925cfd3"
  },
  {
    "url": "assets/js/17.770c5226.js",
    "revision": "c10216ac20a188639bafa110e19e2937"
  },
  {
    "url": "assets/js/18.9d686999.js",
    "revision": "d6d9bb50d229d2c2d0f2591e78413a7e"
  },
  {
    "url": "assets/js/19.f289440c.js",
    "revision": "2cc33c6338b6da8f1bdf150e24fb7129"
  },
  {
    "url": "assets/js/20.53a65b83.js",
    "revision": "54c1272c7ad421e0fd2ad832be816f84"
  },
  {
    "url": "assets/js/21.1f6733ee.js",
    "revision": "23354cd09b2f82709f3aeb1a60c39cd2"
  },
  {
    "url": "assets/js/22.30a86556.js",
    "revision": "cbd6104b911050122879904fb757f8c4"
  },
  {
    "url": "assets/js/23.d4d7b09a.js",
    "revision": "4c3133d1f272783749167ee5a167f5bd"
  },
  {
    "url": "assets/js/24.a9378576.js",
    "revision": "34b390b739b5905f150f928de0306dd2"
  },
  {
    "url": "assets/js/25.78218001.js",
    "revision": "af3089fd3e72a592cf7e58425aa433d5"
  },
  {
    "url": "assets/js/26.c0353bf6.js",
    "revision": "abec6c9461cfa8d86a59b4bb05dafab2"
  },
  {
    "url": "assets/js/27.dd9da93f.js",
    "revision": "bacca17213cb6c13f682e07014f1d9df"
  },
  {
    "url": "assets/js/28.25d161c0.js",
    "revision": "54178808da7af7c9d53ea4c7bab3d0be"
  },
  {
    "url": "assets/js/29.4a4bf2a8.js",
    "revision": "de026bd90cc518eb9404bd0993748d80"
  },
  {
    "url": "assets/js/3.723a7405.js",
    "revision": "e084b8ac81e0cc66afca9730579df18e"
  },
  {
    "url": "assets/js/30.2413e3f0.js",
    "revision": "282083e3badff254684405d04ea42c3e"
  },
  {
    "url": "assets/js/31.2371c533.js",
    "revision": "3a85fdfc39eff20de8efdeba185cc219"
  },
  {
    "url": "assets/js/32.8f2d1cc9.js",
    "revision": "1c47787d5702f286e251a3e92a8336c9"
  },
  {
    "url": "assets/js/33.978be739.js",
    "revision": "8371a26b298777e6ec4eca0245b64261"
  },
  {
    "url": "assets/js/34.108de993.js",
    "revision": "e9e45b93f0438a0f3b941bae923901f9"
  },
  {
    "url": "assets/js/35.c7ffcafa.js",
    "revision": "e4a1fdbaabb37b7c2e57dabde1ded46f"
  },
  {
    "url": "assets/js/36.3d0626c3.js",
    "revision": "8ea2caab476a58ce0249512774862488"
  },
  {
    "url": "assets/js/37.e898596b.js",
    "revision": "84b18b0135e3a11bee0e09a48a754dd0"
  },
  {
    "url": "assets/js/38.41a0876c.js",
    "revision": "5b81f456ed273fd7c005bb89ec925f1d"
  },
  {
    "url": "assets/js/4.0381dff6.js",
    "revision": "0b7900f4299321369bec2ba321f1f5c7"
  },
  {
    "url": "assets/js/5.2fca1259.js",
    "revision": "91959bc7f39c41c80e2eca84951495c0"
  },
  {
    "url": "assets/js/6.fe0fde37.js",
    "revision": "b211ef25f0b2aec18da5dfb9c00908b6"
  },
  {
    "url": "assets/js/7.1e149836.js",
    "revision": "96dd8d100a2db573c2c5a2d71275fe9b"
  },
  {
    "url": "assets/js/8.cb1114fd.js",
    "revision": "4cb085917aa9085975f9deb127b61b34"
  },
  {
    "url": "assets/js/9.15771b1d.js",
    "revision": "ade3b040929e9d9c56922fbf1b84aa55"
  },
  {
    "url": "assets/js/app.a046fdbc.js",
    "revision": "b86fd5a6c3bb57dbed547f59f68c4016"
  },
  {
    "url": "components/star-line.html",
    "revision": "b9095887aa253d3fd3285b13236ee657"
  },
  {
    "url": "components/star-orbit.html",
    "revision": "405b95cd6a759871f6a48b88c0f7e491"
  },
  {
    "url": "components/star-point.html",
    "revision": "e210a9385067945bda61e5e5550278c3"
  },
  {
    "url": "components/star-text/display.html",
    "revision": "2bb2882e5777136db7af4fdffae0f366"
  },
  {
    "url": "components/star-text/line.html",
    "revision": "86349a0e07bebb49951d20ce53fb81e3"
  },
  {
    "url": "components/star-timer.html",
    "revision": "53144fa919bb8461c07a5d8a52592f18"
  },
  {
    "url": "components/star-voice/device.html",
    "revision": "8a4f099c974e77720742206e13345071"
  },
  {
    "url": "components/star-voice/music.html",
    "revision": "c288ab3d922b27f5730d0b900ebb1f04"
  },
  {
    "url": "guide/about.html",
    "revision": "7175466be4efca1130658308121f124d"
  },
  {
    "url": "guide/design.html",
    "revision": "883fc53657d6671db1485fa7abd2cb31"
  },
  {
    "url": "guide/index.html",
    "revision": "d36d52bc0a7342300a7049008259f510"
  },
  {
    "url": "guide/todo.html",
    "revision": "b8c9d03c05396504849e697ae371f59a"
  },
  {
    "url": "index.html",
    "revision": "8ecd4744313ee79d7187ece87948005e"
  },
  {
    "url": "star.svg",
    "revision": "b3614d26248315116090eb6fe3f6fbea"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
