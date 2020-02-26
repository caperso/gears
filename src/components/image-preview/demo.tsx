import { Button } from 'antd';
import React, { useState } from 'react';
import { ImagePreview } from './ImagePreview';

const tempImage = 'https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809434__480.jpg';

export const ImagePreviewDemo = () => {
    const [show, setShow] = useState(false);

    const showPreview = () => {
        setShow(true);
    };
    const closePreview = () => {
        setShow(false);
    };

    return (
        <div>
            <h3>组件名称：图片预览（ImagePreview）</h3>
            <img src={tempImage} onClick={showPreview}></img>
            <Button onClick={showPreview}>显示预览 </Button>
            <ImagePreview url={tempImage} showPreview={show} closePreview={closePreview} />
        </div>
    );
};
