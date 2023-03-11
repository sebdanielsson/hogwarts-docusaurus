/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: "/docs",
        blogRouteBasePath: "/",
        docsDir: "docs",
        blogDir: "blog",
        removeDefaultStopWordFilter: false,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: false,
      },
    ],
  ],
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
      theme: require("prism-react-renderer/themes/dracula"),
      additionalLanguages: ["nginx", "systemd"],
    },
    navbar: {
      title: "Hogwarts",
      logo: {
        alt: "Hogwarts Logo",
        src: "img/hogwarts-icon-dark.webp",
      },
      items: [
        { to: "/", label: "Blog", position: "left" },
        { to: "/contact", label: "Contact", position: "left" },
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
          html: `<a rel="me" href="https://mastodon.social/@sebbo">Mastodon</a>`,
          position: "right",
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
