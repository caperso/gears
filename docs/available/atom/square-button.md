---
title: 方形按钮(SquareButton)
toc: menu
group:
    order: 3
    title: 原子组件
---

## 概览

## 演示

简单模式:

数据按约定的接口组成列表

```ts
const data = [
    { name: '维护系统入口', icon },
    { name: '签到系统入口', icon },
    { name: '排查系统入口', icon },
    { name: '登记系统入口', icon },
    { name: '销毁系统入口', icon },
];
```

<code src="@/components/square-button/demo/demo.tsx" />

## API

| 参数 | 必须  | 类型   | 默认值 | 说明         |
| :--- | :---- | :----- | :----- | :----------- |
| name | true  | string | -      | 按钮内容     |
| icon | false | string | -      | 按钮图标地址 |
