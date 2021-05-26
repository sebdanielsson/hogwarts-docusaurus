/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Hogwarts',
  tagline: 'Guides for macOS & Linux',
  url: 'https://hogwarts.zone',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/hogwarts-icon-dark.webp',
  organizationName: 'SebDanielsson', // Usually your GitHub org/user name.
  projectName: 'hogwarts-docusaurus', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['nginx'],
    },
    navbar: {
      title: 'Hogwarts',
      logo: {
        alt: 'Hogwarts Logo',
        src: 'img/hogwarts-icon-dark.webp',
      },
      items: [
        {to: '/', label: 'Blog', position: 'left'},
        {to: '/contact', label: 'Contact', position: 'left'},
        //{to: '/landingpage', label: 'Landingpage', position: 'left'},
        //{
        //  type: 'doc',
        //  docId: 'intro',
        //  position: 'left',
        //  label: 'Docs',
        //},
        //{
        //  href: 'https://github.com/sebdanielsson',
        //  label: 'GitHub',
        //  position: 'right',
        //},
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Hubz',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/SebDanielsson',
            },
            {
              label: 'Docker Hub',
              href: 'https://hub.docker.com/u/sebdanielsson',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hogwarts.zone - Built with Docusaurus.`,
    },
    //algolia: {
    //  apiKey: '',
    //  indexName: '',

      // Optional: Algolia search parameters
      //searchParameters: {},
    //},
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/SebDanielsson/hogwarts-docusaurus/edit/main/docs/',
        },
        blog: {
          routeBasePath: '/',
          showReadingTime: false,
          // Please change this to your repo.
          editUrl:
            'https://github.com/SebDanielsson/hogwarts-docusaurus/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
