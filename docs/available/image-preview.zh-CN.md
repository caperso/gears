---
title: 图片预览(ImagePreview)
toc: menu
---

## 概览

|                |                            |
| :------------- | :------------------------- |
| 导入名称       | ImagePreview               |
| 描述           | 浏览图片, 含基础交互功能   |
| 特性: 基础     | 缩放, 拖拽, 旋转, 自由旋转 |
| 特性: 即将更新 | 保存                       |
| 特性: 未来     | 测量, 简单绘画             |

## 演示

<code src="@/components/image-preview/demo/demo-simple.tsx" />

<code src="@/components/image-preview/demo/demo-custom.tsx" />

<code src="@/components/image-preview/demo/demo-unfixed.tsx" />

## API

| 参数               | 是否必须 | 类型                               | 默认值 | 说明                                                     |
| :----------------- | :------- | :--------------------------------- | :----- | :------------------------------------------------------- |
| url                | true     | string                             | ''     | 图片地址                                                 |
| visible            | true     | boolean                            | false  | 可视状态                                                 |
| onClose            | true     | () => void;                        | null   | 关闭时候的回调                                           |
| simpleMode         | false    | boolean                            | true   | 简易模式, 当为 true 时, operator 和 fixedOnScreen 不可控 |
| operator           | true     | 'default' \| null \| OperatorProps | null;  | 控制条, 'default' 则生成默认操作栏,简易模式下必定为 null |
| fixedOnScreen      | false    | boolean                            | true   | 是否在整个全屏遮罩固定, 简易模式下必定为 true            |
| getImageLoadedSize | false    | (state: BaseImageProps) => void;   | null   | 图片加载成功后返回图片的加载尺寸                         |
