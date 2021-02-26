---
title: 快速上手
nav:
  title: 快速上手
  order: 1
---

## 安装

`npm install gearware`

or

`yarn add gearware`

## 更新

`npm upgrade gearware@latest`

or

`yarn upgrade gearware@latest`

## 引入

es6(推荐):

```ts
import { ImagePreview } from 'gearware';
```

cmd/amd 模块暂不支持

## 示例

react 组件:

```ts
import React, { useState } from 'react';
import { ImagePreview } from 'gearware';

const sampleImage = 'https://s1.ax1x.com/2020/03/28/GFfufU.jpg';

const ImagePreviewDemo = () => {
  const [show, setShow] = useState<boolean>(false);

  const close = () => {
    setShow(false);
  };

  return (
    <div className="g-table">
      <img alt="a lovely cat" src={sampleImage} className="g-sample-image" onClick={() => setShow(true)} />
      <ImagePreview url={sampleImage} visible={show} onClose={close} simpleMode={true} />
    </div>
  );
};
```
