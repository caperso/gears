---
title: 展厅(Gallery)
toc: menu
nav:
  title: 可用组件
---

## 概览

图片展示组件，开放若干种图片排列模式，图片数组随机（可选）排列，按堆栈方式从底层排列到顶。
(部分能力努力迭代中)

设计原则：图片最大程度不重叠，图片播散在各个象限中(未来象限数量也可定)

## 演示

<code src="../../src/components/maintaining/gallery/demo/demo.tsx" />

## API

| 参数        | 是否必须 | 类型        | 默认值    | 说明               |
| :---------- | :------- | :---------- | :-------- | :----------------- |
| units       | true     | GalleryUnit | []        | 传入图片数据       |
| limit       | false    | number      | null      | 数量限制           |
| mode        | false    | GalleryMode | 'annular' | 图片发散方法       |
| defaultGray | false    | number      | 0.9       | 默认灰度:0-1       |
| centralized | false    | boolean     | true      | 末尾图片是否在中心 |

## Type

GalleryUnit

| 参数        | 类型   | 说明     |
| :---------- | :----- | :------- |
| name        | string | 名称     |
| url         | string | 图片地址 |
| description | string | 描述     |

GalleryMode

| 参数    | 说明         |
| :------ | :----------- |
| random  | 图片随机发散 |
| annular | 图片环形发散 |
