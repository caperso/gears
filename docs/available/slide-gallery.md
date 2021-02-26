---
title: 滑动图展(SlideGallery)
toc: menu
nav:
  title: 可用组件
---

## 概览

纯粹的图片列表展示组件

## 演示

<code src="../../src/components/maintaining/slide-gallery/demo/demo.tsx" />

## API

| 参数   | 是否必须 | 类型        | 默认值 | 说明         |
| :----- | :------- | :---------- | :----- | :----------- |
| images | true     | GalleryUnit | []     | 传入图片数据 |

## Type

GalleryUnit

| 参数        | 类型             | 说明         |
| :---------- | :--------------- | :----------- |
| name        | string           | 名称         |
| url         | string           | 图片地址     |
| description | string           | 描述         |
| id          | number \| string | 可选,照片 id |
