/**
 * title: 非全屏遮罩模式
 * desc:  包含在特定组件, 元素内(案例包含于Ant-Modal内)
 */

import { Modal } from 'antd';
import 'antd/es/modal/style/css';
import React, { useState } from 'react';
import { BaseImageProps, ImagePreview } from '../ImagePreview';
import './demo.less';

const sampleImage = 'http://bitbear.cdn.v2geek.com/uploads/20032616137A6C923ED.jpg';

const ImagePreviewDemo = () => {
    const [show, setShow] = useState<boolean>(false);

    const close = () => {
        setShow(false);
    };

    const [modalWidth, setModalWidth] = useState(500);

    const getImageLoadedSize = (size: BaseImageProps) => {
        setModalWidth(size.w + 48);
    };

    return (
        <div className="g-table">
            <img alt="a lovely cat" src={sampleImage} className="g-sample-image" onClick={() => setShow(true)} />
            <Modal visible={show} onCancel={close} width={modalWidth} style={{ width: '780px', height: '520px', top: '10px' }}>
                <ImagePreview
                    url={sampleImage}
                    visible={true}
                    onClose={close}
                    operatorBar="default"
                    fixedOnScreen={false}
                    getImageLoadedSize={getImageLoadedSize}
                />
            </Modal>
        </div>
    );
};

export default () => <ImagePreviewDemo />;
