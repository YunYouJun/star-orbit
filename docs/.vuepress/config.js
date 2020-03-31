const pkg = require("../../package.json");
module.exports = {
  base: "/" + pkg.name + "/",
  title: pkg.name,
  description: pkg.description,
  head: [
    ["link", { rel: "icon", href: "/star.svg" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#8e71c7" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    ["link", { rel: "apple-touch-icon", href: "/star.svg" }],
    ["link", { rel: "mask-icon", href: "/star.svg", color: "#8e71c7" }],
    ["meta", { name: "msapplication-TileImage", content: "/star.svg" }],
    ["meta", { name: "msapplication-TileColor", content: "#8e71c7" }]
  ],
  themeConfig: {
    logo: "/star.svg",
    sidebar: "auto",
    lastUpdated: "上次更新",
    repo: "YunYouJun/star-orbit",
    editLinks: true,
    editLinkText: "帮助改善此页面！( ￣□￣)/",
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Components", link: "/components/star-timer" }
    ],
    sidebar: {
      "/guide/": ["", "about", "design", "todo"],
      "/components/": [
        "star-timer",
        {
          title: "Star Voice",
          collapsable: false,
          children: [
            "/components/star-voice/device.html",
            "/components/star-voice/music.html"
          ]
        },
        "star-orbit",
        "star-line",
        "star-point",
        {
          title: "Star Text",
          collapsable: false,
          children: [
            "/components/star-text/line.html",
            "/components/star-text/display.html"
          ]
        }
      ]
    }
  },
  plugins: [
    "@vuepress/back-to-top",
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ]
};
