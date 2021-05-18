/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Hogwarts',
  tagline: 'Guides for macOS & Linux',
  url: 'https://hogwarts.zone',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'SebDanielsson', // Usually your GitHub org/user name.
  projectName: 'hogwarts-docusaurus', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Hogwarts',
      logo: {
        alt: 'My Site Logo',
        src: 'img/hogwarts-icon.png',
      },
      items: [
        {to: '/', label: 'Blog', position: 'left'},
        {to: '/landingpage', label: 'Landingpage', position: 'left'},
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/sebdanielsson',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
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
          showReadingTime: true,
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
