/**
 * title: 自定义操作栏元素组件
 * desc:  基础示例 单击图片 将等比拉伸至可能的屏幕最大尺寸, 无菜单
 */

import React, { useState } from 'react';
import { ImagePreview } from '../ImagePreview';
import './demo.less';

const sampleImage = 'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

const ImagePreviewDemo = () => {
    const [show, setShow] = useState<boolean>(false);

    const close = () => {
        setShow(false);
    };

    const bar: React.ReactElement = (
        <div className="test-bar">
            <span
                data-gear-image-method="free-rotate"
                onClick={() => {
                    console.log(123);
                }}
                style={{ color: 'green' }}
            >
                DESC
            </span>
            <span data-gear-image-method="free-rotate" style={{ color: 'green' }}>
                DESC
            </span>
            <span data-gear-image-method="free-rotate" style={{ color: 'green' }}>
                DESC
            </span>
        </div>
    );

    return (
        <div className="g-table">
            <img alt="图片" src={sampleImage} className="g-sample-image" onClick={() => setShow(true)} />
            <ImagePreview url={sampleImage} visible={show} onClose={close} operator={{ bar }} />
        </div>
    );
};

export default () => {
    return <ImagePreviewDemo />;
};
