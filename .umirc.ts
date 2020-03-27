import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'Gearware',
    mode: 'site',
    logo: 'https://www.easyicon.net/api/resizeApi.php?id=1180534&size=72',
    locales: [
        ['zh-CN', '中文'],
        ['en-US', 'English'],
    ],
    // more config: https://d.umijs.org/config
    // menus: {
    //   // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    //   '/image-preview': [
    //     {
    //       title: '菜单项',
    //       path: '菜单路由（可选）',
    //       children: [
    //         // 菜单子项（可选）
    //         'docs/image-preview/README.zh-CN.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
    //       ],
    //     },
    //   ],
    //   // 如果该路径有其他语言，需在前面加上语言前缀，需与 locales 配置中的路径一致
    //   // '/zh-CN/guide': [
    //     // 省略，配置同上
    //   // ],
    // },
});
