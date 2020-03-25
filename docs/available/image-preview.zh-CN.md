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
| 特性: 即将更新 | 自定义行动栏               |
| 特性: 未来     | 保存, 测量, 简单绘画       |

## 演示

<code src="@/components/image-preview/demo/demo-simple.tsx" />

<code src="@/components/image-preview/demo/demo-custom.tsx" />

<code src="@/components/image-preview/demo/demo-operation.tsx" />

<code src="@/components/image-preview/demo/demo-unfixed.tsx" />

## API

| 参数               | 必须  | 类型                                  | 默认值 | 说明                               |
| :----------------- | :---- | :------------------------------------ | :----- | :--------------------------------- |
| url                | true  | string                                | ''     | 图片地址                           |
| visible            | true  | boolean                               | false  | 可视状态                           |
| onClose            | true  | () => void;                           | null   | 关闭时候的回调方法                 |
| simpleMode         | false | boolean                               | true   | 简易模式, 不包含控制项目, 仅有放大 |
| operatorBar        | true  | 'default' \| null \| OperatorBarProps | null;  | 交互控制面板, 控制图片状态         |
| fixedOnScreen      | false | boolean                               | true   | 是否在整个全屏遮罩固定,            |
| getImageLoadedSize | false | (state: BaseImageProps) => void;      | null   | 图片加载成功后返回图片的加载尺寸   |

## 细节

| 名称        | 细节描述                                                                          |
| :---------- | :-------------------------------------------------------------------------------- |
| simpleMode  | 当 true: fixedOnScreen 固定为 true, operatorBar 固定为 null                       |
| operatorBar | 当 'default': 生成默认控制项, 当 OperatorBarProps: 接受一个字符串数组, 表明控制项 |

## 类型

| 名称             | 描述                              |
| :--------------- | :-------------------------------- |
| OperatorBarProps | 当前版本请在 ide 中查看 type 内容 |
| BaseImageProps   | 当前版本请在 ide 中查看 type 内容 |
