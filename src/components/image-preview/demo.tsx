import { Button, Modal } from 'antd';
import { CodePaper } from 'components/code-paper/CodePaper';
import React, { useState } from 'react';
import img from '../../assets/image/panda.png';
import './demo.scss';
import { ImagePreview } from './ImagePreview';

export const ImagePreviewDemo = () => {
    const [show, setShow] = useState(false);

    const [webImageUrl, setWebImageUrl] = useState();

    const handleChangeUrl = (text: string) => {
        setWebImageUrl(text);
    };

    const showModal = () => {
        setShow(true);
    };

    // 关闭modal 复位图片
    const closeModal = () => {
        setShow(false);
    };

    return (
        <div>
            <h3>组件名称：图片预览（ImagePreview）</h3>
            <h4>示例图片</h4>
            <img src={img} alt="图片" onClick={showModal}></img>
            <h4>网络图片</h4>
            <p>将想要测试图片地址输入(空白使用默认图片)</p>
            <CodePaper text="" handleChange={handleChangeUrl} />
            <div className="buttons">
                <Button onClick={showModal}>显示预览 </Button>
            </div>
            <Modal className="preview-modal" onCancel={closeModal} footer={null} visible={show}>
                <h3>图片预览</h3>
                <ImagePreview url={webImageUrl ? webImageUrl : img} />
            </Modal>
        </div>
    );
};
