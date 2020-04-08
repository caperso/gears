---
title: 展厅(Gallery)
toc: menu
nav:
  title: 可用组件
---

## 演示

<code src="@/components/developing/gallery/demo/demo.tsx" />

## API

| 参数        | 是否必须 | 类型        | 默认值    | 说明               |
| :---------- | :------- | :---------- | :-------- | :----------------- |
| units       | true     | GalleryUnit | []        | 传入图片数据       |
| limit       | false    | number      | null      | 数量限制           |
| mode        | false    | GalleryMode | 'annular' | 图片发散方法       |
| defaultGray | false    | number      | 0.9       | 默认灰度:0-1       |
| centralized | false    | boolean     | true      | 末尾图片是否在中心 |

## type

type: GalleryUnit

| 参数        | 类型   | 说明     |
| :---------- | :----- | :------- |
| name        | string | 名称     |
| url         | string | 图片地址 |
| description | string | 描述     |

type: GalleryMode

| 参数    | 说明         |
| :------ | :----------- |
| random  | 图片随机发散 |
| annular | 图片环形发散 |
