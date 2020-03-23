/**
 * title: 非全屏遮罩模式
 * desc:  包含在特定组件, 元素内(案例包含于Ant-Modal内)
 */

import { Modal } from 'antd';
import React, { useState } from 'react';
import { BaseImageProps } from '../ImagePreview';
import './demo.less';

const sampleImage =
  'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

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
      <img
        alt="图片"
        src={sampleImage}
        className="g-sample-image"
        onClick={() => setShow(true)}
      />
      <Modal
        visible={show}
        onCancel={close}
        width={modalWidth}
        style={{ width: '780px', height: '520px' }}
      >
        123123123213213
        {/* <ImagePreview
          url={sampleImage}
          visible={true}
          onClose={close}
          operator="default"
          fixedOnScreen={false}
          getImageLoadedSize={getImageLoadedSize}
        /> */}
      </Modal>
    </div>
  );
};

export default () => <ImagePreviewDemo />;
