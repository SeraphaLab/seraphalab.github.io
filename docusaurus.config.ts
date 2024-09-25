import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Serapha',
    tagline: 'A lightweight, modular PHP framework utilizing modern practices with template engine and Sanite for easy database CRUD operations.',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://seraphalab.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'SeraphaLab', // Usually your GitHub org/user name.
    projectName: 'Wiki', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            {
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                },
                docs: {
                    sidebarPath: './sidebars.ts',
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    editUrl:
                        'https://github.com/SeraphaLab/seraphalab.github.io/tree/main/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        navbar: {
            title: 'Serapha',
            logo: {
                alt: 'Serapha Logo',
                src: 'img/logo.svg',
                style: {
                    borderRadius: '50%',
                }
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Document',
                },
                {
                    href: 'https://github.com/SeraphaLab/Serapha',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            copyright: `Copyright © ${new Date().getFullYear()} SeraphaLab. Built with Docusaurus.`,
        },
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        prism: {
            theme: prismThemes.oneDark,
            darkTheme: prismThemes.oneDark,
            additionalLanguages: ['php', 'ini', 'json', 'yaml', 'apacheconf', 'bash', 'nginx', 'sql'],
        },
        algolia: {
            appId: 'WR1II1JEI5',
            apiKey: '450d5fd0c750ac1cd38366f342ebce04',
            indexName: 'seraphalabio',
            contextualSearch: true,
            externalUrlRegex: 'external\\.com|domain\\.com',
            replaceSearchResultPathname: {
                from: '/docs/',
                to: '/docs/',
            },
            searchParameters: {},
            searchPagePath: 'search',
            insights: false,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
