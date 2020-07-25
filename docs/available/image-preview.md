---
title: 图片预览(ImagePreview)
toc: menu
group:
  order: 2
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

### 基础演示

<code src="../../src/components/maintaining/image-preview/demo/demo-simple.tsx" />

### 自定义功能

<code src="../../src/components/maintaining/image-preview/demo/demo-custom-operation.tsx" />

### 自定义功能栏

<code src="../../src/components/maintaining/image-preview/demo/demo-custom-toolbar.tsx" />

### 无遮罩

"我不想要遮罩"

一般来说, 浏览窗口需要占据全屏的遮罩组件整体性得到保证.

然而我们提供了一个视窗内展示图片的选项, 但外部容器需要用户自定义

> 目前对于滚轮的默认行为不进行限制,滚轮缩放会带动页面下移,需要自定容器限制

<code src="../../src/components/maintaining/image-preview/demo/demo-unfixed.tsx" />

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

## 需要反馈

请暂时在<https://caperal.cn>的联系方式中联系我
