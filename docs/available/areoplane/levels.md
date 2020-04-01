---
title: 层级导航(Levels)
toc: menu
group:
  title: 整体组件
  order: 3
---

## 概览

## 演示

### 简单例子

点击展开,深层递归查询,根据路由更新状态

<code src="@/components/levels/demo/demo-simple.tsx" />

### 多层例子

默认自动展开, 回调函数返回路由信息

<code src="@/components/levels/demo/demo.tsx" />

### 完整例子

默认自动展开, 回调函数返回路由信息

<code src="@/components/levels/demo/demo-complex.tsx" />

## API

Levels 组件接口:

| 参数                  | 必须  | 类型                | 默认值 | 说明                              |
| :-------------------- | :---- | :------------------ | :----- | :-------------------------------- |
| data                  | true  | Level[]             | []     | 阶级数据                          |
| defaultExpanded       | false | boolean             | false  | 是否 默认展开所有层级             |
| getCurrentActiveRoute | false | (route:string)=>any | null   | 获取当前路由                      |
| baseFontSize          | false | number              | 45     | !将被移除! 基础字体大小           |
| fontSizeDecrease      | false | number              | 3      | !将被移除! 字体大小随层级向下递减 |

## 类型

Level 类型接口:

| 参数        | 必须  | 类型                   | 默认值 | 说明                            |
| :---------- | :---- | :--------------------- | :----- | :------------------------------ |
| name        | true  | string                 | -      | 单项名称                        |
| route       | false | string                 | null   | 单项真是路由地址(表示路径)      |
| staticUrl   | false | string                 | null   | 静态地址(用于直接跳转)          |
| description | false | string                 | null   | 描述(悬浮出现)                  |
| action      | false | (route: string) => any | null   | 点击事件(getCurrentActiveRoute) |
| deep        | false | Level[]                | null   | 下一层数据(接受 Level 类型数组) |

### 注意

若同级 route 皆指定, 同级 route 不能重名;

若同级 route 皆未指定, 同级 name 不能重名;

若同级个别 route 未指定, 同级 name 与 route 不能有重名;
