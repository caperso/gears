import { Button } from 'antd';
import React, { useState } from 'react';
import './demo.scss';
import { ImagePreview } from './ImagePreview';

const thumbUrl = 'https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809434__480.jpg';
const imageUrl = 'https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809434_1280.jpg'

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
            <ImagePreview url={imageUrl} showPreview={show} closePreview={closePreview} />
            <img src={thumbUrl} alt="图片" onClick={showPreview}></img>
            <div className="buttons">
                <Button onClick={showPreview}>显示预览 </Button>
            </div>
        </div>
    );
};
