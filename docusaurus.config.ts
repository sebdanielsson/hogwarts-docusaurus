import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hogwarts',
  tagline: "Guides for macOS & Linux",
  url: "https://hogwarts.zone",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/hogwarts-icon-dark.webp",
  organizationName: "sebdanielsson",
  projectName: "hogwarts-docusaurus",
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            "https://github.com/SebDanielsson/hogwarts-docusaurus/edit/main/docs/",
        },
        blog: {
          routeBasePath: "/",
          showReadingTime: false,
          editUrl:
            "https://github.com/SebDanielsson/hogwarts-docusaurus/edit/main/",
        },
        theme: {
          customCss: ["./src/css/custom.css"],
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["nginx", "systemd"],
    },
    navbar: {
      title: "Hogwarts",
      logo: {
        alt: "Hogwarts Logo",
        src: "img/hogwarts-icon-dark.webp",
      },
      items: [
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
  } satisfies Preset.ThemeConfig,
  scripts: [
    {
      src: "https://plausible.hogwarts.zone/js/script.js",
      defer: true,
      "data-domain": "hogwarts.zone",
    },
  ],
};

export default config;
