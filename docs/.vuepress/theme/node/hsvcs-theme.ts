import {defaultTheme, Page, Theme} from "vuepress";
import * as path from "path";
import * as fs from "fs";
import { HsVcsPageData } from "../types/page";
import { gitPlugin } from "@vuepress/plugin-git";
import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import { palettePlugin } from "@vuepress/plugin-palette";
import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon"

export const HsvcsTheme = (themeConfig: Record<string, unknown>): Theme => {
    return {
        name: "hsvcs-theme",
        extends: defaultTheme(themeConfig),
        onInitialized(app) {
            if (app.options.bundler.name === '@vuepress/bundler-vite') {
                app.options.bundler = viteBundler({
                    viteOptions: {
                        css: {
                            postcss: {
                                plugins: [
                                    require('postcss-import'),
                                    require('tailwindcss/nesting'),
                                    require('tailwindcss'),
                                    require('autoprefixer')({}),
                                    require('postcss-each')
                                ]
                            }
                        },
                        optimizeDeps: {
                            exclude: ['vue']
                        }
                    },
                })
            } else {
                app.options.bundler = webpackBundler({
                    postcss: {
                        postcssOptions: {
                            plugins: [
                                ['tailwindcss'],
                                ['autoprefixer', {}],
                                [require('tailwindcss/nesting')],
                                ['postcss-each']
                            ]
                        },
                    },
                })
            }
        },
        templateBuild: path.resolve(__dirname, "../templates/index.build.html"),
        templateDev: path.resolve(__dirname, "../templates/index.dev.html"),
        layouts: path.resolve(__dirname, "../client/layouts"),
        alias: Object.fromEntries(
            fs
                .readdirSync(path.resolve(__dirname, '../client/components'))
                .filter((file) => file.endsWith('.vue'))
                .map((file) => [
                    `@theme/${file}`,
                    path.resolve(__dirname, '../client/components', file),
                ])
        ),
        extendsPage: (page: Page<HsVcsPageData>) => {
            page.data.filePathRelative = page.filePathRelative;
            page.routeMeta.title = page.title
        },
        plugins: [
            activeHeaderLinksPlugin(),
            backToTopPlugin(),
            gitPlugin(),
            palettePlugin(),
            prismjsPlugin(),
            activeHeaderLinksPlugin({}),
            externalLinkIconPlugin(),
            themeDataPlugin({ themeData: themeConfig }),
        ]
    }
}
