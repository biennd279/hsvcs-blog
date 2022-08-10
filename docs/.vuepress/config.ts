import { defineUserConfig } from 'vuepress'
import {HsvcsTheme} from "./theme/node/hsvcs-theme";

export default defineUserConfig({
    lang: 'en-US',
    title: 'Hello VuePress',
    description: 'Just playing around',
    theme: HsvcsTheme({})
})
