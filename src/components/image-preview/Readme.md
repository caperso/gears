# 组件名称：图片预览（ImagePreview）

## API

| 参数               | 是否必须 | 类型                               | 默认值 | 说明                                                     |
| :----------------- | :------- | :--------------------------------- | :----- | :------------------------------------------------------- |
| url                | true     | string                             | ''     | 图片地址                                                 |
| visible            | true     | boolean                            | false  | 可视状态                                                 |
| onClose            | true     | () => void;                        | null   | 关闭时候的回调                                           |
| simpleMode         | false    | boolean                            | true   | 简易模式, 当为 true 时, operator 和 fixedOnScreen 不可控 |
| operator           | true     | 'default' \| null \| OperatorProps | null;  | 控制条, 'default' 则生成默认操作栏,简易模式下必定为 null |
| fixedOnScreen      | false    | boolean                            | true   | 是否在整个全屏遮罩固定, 简易模式下必定为 true            |
| getImageLoadedSize | false    | (state: BaseImageProps) => void;   | null   | 图片加载成功后返回图片的加载尺寸                         |

## 基础操作: 滚轮缩放 拖拽

> 菜单操作: 旋转 重置

简易模式示例
单击图片 将等比拉伸至可能的屏幕最大尺寸, 无菜单

```tsx
import React, { useState } from 'react';

const sampleImage = 'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

const [show, setShow] = useState(false);

const close = () => setShow(false);

<div>
    <img src={sampleImage} alt="图片" className="g-sample-image" onClick={() => setShow(true)} />
    <ImagePreview url={sampleImage} simpleMode={true} visible={show} onClose={close} />
</div>;
```

功能菜单
含默认右键菜单

```tsx
import React, { useState } from 'react';

const sampleImage = 'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

const [show, setShow] = useState(false);

const close = () => setShow(false);

<div>
    <img src={sampleImage} alt="图片" className="g-sample-image" onClick={() => setShow(true)} />
    <ImagePreview url={sampleImage} operator="default" fixedOnScreen={true} visible={show} onClose={close} />
</div>;
```

非全屏遮罩模式
包含在特定组件, 元素内
包含于 Ant-Modal 内

```tsx
import React, { useState } from 'react';
import { Modal } from 'antd';

const sampleImage = 'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

const [show, setShow] = useState(false);

const close = () => setShow(false);

const [modalWidth, setModalWidth] = useState(500);

const getImageLoadedSize = (size) => {
    setModalWidth(size.w + 48);
};

<div>
    <img src={sampleImage} alt="图片" className="g-sample-image" onClick={() => setShow(true)} />
    <Modal visible={show} width={modalWidth} onCancel={close} style={{ width: '780px', height: '520px' }}>
        <ImagePreview
            url={sampleImage}
            getImageLoadedSize={getImageLoadedSize}
            fixedOnScreen={false}
            operator="default"
            visible={true}
            onClose={close}
        />
    </Modal>
    <ImagePreview url={sampleImage} operator="default" fixedOnScreen={true} visible={show} onClose={close} />
</div>;
```
