---
title: 右键菜单(ContextMenu)
toc: menu
group:
  title: 整体组件
  order: 1
---

## 概览

## 演示

简单模式:

数据按约定的接口组成列表

```ts
const menuList = [
    { name: 'Say hi', method: greetMessage },
    { name: 'Tell me when', method: getTime },
    { name: 'Report an issue', method: reportIssue },
];
```

<code src="@/components/context-menu/demo/demo-list-menu.tsx" />

自定义模式:

传入 React 节点

```ts
const menuNode = (
    <div className="test-context-node">
        <p className="g-context-menu-item" onClick={loadSequence}>
            LAUNCH THE MISSILE
        </p>
        // ....Rest of code
    </div>
);
```

<code src="@/components/context-menu/demo/demo-custom-menu.tsx" />

## API

| 参数     | 必须 | 类型                                       | 默认值 | 说明             |
| :------- | :--- | :----------------------------------------- | :----- | :--------------- |
| menu     | true | MenuItem[] \| React.ReactElement           | -      | 菜单内容         |
| children | true | React.ReactElement \| React.ReactElement[] | -      | 需要被包裹的元素 |
