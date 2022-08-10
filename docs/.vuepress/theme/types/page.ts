import type { GitPluginPageData } from '@vuepress/plugin-git'
import {DefaultThemePageFrontmatter} from "@vuepress/theme-default/lib/shared/page";

export interface HsVcsPageData extends GitPluginPageData {
    filePathRelative?: string | null;
}

export interface HsVcsThemePageFrontmatter {
    home?: boolean;
    navbar?: boolean;
    pageClass?: string;
}
