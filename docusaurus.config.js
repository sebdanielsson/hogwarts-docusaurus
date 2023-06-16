/** @returns {Promise<import('@docusaurus/types').Config>} */
module.exports = async function createConfigAsync() {
  return {
    title: "Hogwarts",
    tagline: "Guides for macOS & Linux",
    url: "https://hogwarts.zone",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/hogwarts-icon-dark.webp",
    organizationName: "SebDanielsson",
    projectName: "hogwarts-docusaurus",
    themeConfig: {
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: true,
      },
      prism: {
        //theme: require("prism-react-renderer").themes.dracula,
        additionalLanguages: ["nginx", "systemd"],
      },
      navbar: {
        title: "Hogwarts",
        logo: {
          alt: "Hogwarts Logo",
          src: "img/hogwarts-icon-dark.webp",
        },
        items: [
          //{ to: "/", label: "Blog", position: "left" },
          //{to: '/landingpage', label: 'Landingpage', position: 'left'},
          //{
          //type: 'doc',
          //docId: 'intro',
          //position: 'left',
          //label: 'Docs',
          //},
          {
            href: "https://github.com/sebdanielsson",
            label: "GitHub",
            position: "right",
          },
          {
            type: "html",
            position: "right",
            value:
              '<a target="_blank" href="https://mastodon.social/@sebbo" rel="me" class="navbar__link">Mastodon</a>',
          },
        ],
      },
    },
    presets: [
      [
        "@docusaurus/preset-classic",
        {
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl:
              "https://github.com/SebDanielsson/hogwarts-docusaurus/edit/main/docs/",
          },
          blog: {
            routeBasePath: "/",
            showReadingTime: false,
            // Please change this to your repo.
            editUrl:
              "https://github.com/SebDanielsson/hogwarts-docusaurus/edit/main/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        },
      ],
    ],
    scripts: [
      {
        src: "https://plausible.hogwarts.zone/js/script.js",
        defer: true,
        "data-domain": "hogwarts.zone",
      },
    ],
  };
};
