import { defineConfig } from 'dumi';

export default defineConfig({
  alias: {},
  title: 'Gearware',
  mode: 'site',
  logo: 'https://www.easyicon.net/api/resizeApi.php?id=1180534&size=72',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  // more config: https://d.umijs.org/config
});
