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
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/SeraphaLab/Wiki/tree/main/',
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
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['php', 'ini', 'json', 'yaml', 'apacheconf', 'bash', 'nginx', 'sql'],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
