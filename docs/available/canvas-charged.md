---
title: 加强画布(CanvasCharged)
toc: menu
---

## 演示

<code src="../../src/components/developing/canvas-charged/demo/demo-canvas.tsx" />

## API

| 参数         | 是否必须 | 类型                           | 默认值 | 说明               |
| :----------- | :------- | :----------------------------- | :----- | :----------------- |
| size         | true     | Size \| null                   | null   | 画布大小           |
| mode         | true     | CanvasMode                     | 'draw' | 绘制模式、选择模式 |
| rects        | true     | CanvasRect[]                   | []     | 矩形列表           |
| setRects     | true     | (rects: CanvasRect[]) => any;  | null   | 设置矩形列表       |
| color        | false    | string                         | #f11   | 色彩样式           |
| blockVisible | false    | boolean                        | false  | 块可见             |
| onClick      | false    | (instance: CanvasRect) => any; | null   | 点击块的回调函数   |

## 类型

### Size

```ts
export interface Size {
  w: number;
  h: number;
}
```

### CanvasMode

```ts
type CanvasMode = 'draw' | 'select';
```

### CanvasRect

```ts
{
  public readonly id: number;
  private originPoint: Point2D;
  private crossPoint: Point2D;
  private color: string;
  public dom: HTMLDivElement | null;
}

```

### Point2D

```ts
export interface Point2D {
  x: number;
  y: number;
}
```
