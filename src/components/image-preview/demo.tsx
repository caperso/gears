import { CodePaper } from 'components/code-paper/CodePaper';
import React, { useEffect, useState } from 'react';
import img from '../../assets/image/panda.png';
import './demo.scss';
import { ImagePreview } from './ImagePreview';

export const ImagePreviewDemo = () => {
    const [show, setShow] = useState(false);

    const [webImageUrl, setWebImageUrl] = useState('');

    const showDefaultModal = () => {
        setWebImageUrl('');
        setShow(true);
    };

    const showModal = (text: string) => {
        setWebImageUrl(text);
        localStorage.setItem('image-preview-url', text);
        setShow(true);
    };

    // 关闭modal 复位图片
    // const closeModal = () => {
    //     setShow(false);
    // };

    // 本地缓存url
    useEffect(() => {
        const text = localStorage.getItem('image-preview-url');
        if (text) {
            setWebImageUrl(text);
        }
    }, []);

    return (
        <div>
            <h3>组件名称：图片预览（ImagePreview）</h3>
            <h4>示例图片</h4>
            <img src={img} alt="图片" onClick={showDefaultModal}></img>
            <h4>网络图片</h4>
            <p>将想要测试图片地址输入(空白使用默认图片)</p>
            <CodePaper text={webImageUrl} handleClick={showModal} buttonText="显示预览" className="small-size" />
            {/* <Modal className="preview-modal" onCancel={closeModal} footer={null} visible={show}> */}
            {show && (
                <ImagePreview url={webImageUrl ? webImageUrl : img} visible={show}>
                    <h3>图片预览</h3>
                </ImagePreview>
            )}
            {/* </Modal> */}
        </div>
    );
};
