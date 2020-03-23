import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
// import './demo.less';
import { BaseImageProps, ImagePreview } from '../ImagePreview';

const sampleImage =
  'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

const ImagePreviewDemo = () => {
  const [show, setShow] = useState<number | null>(-1);

  const close = () => {
    setShow(null);
  };

  // 加载本地缓存url
  useEffect(() => {
    const text = localStorage.getItem('image-preview-url');
    if (text) {
    }
  }, []);

  const [modalWidth, setModalWidth] = useState(500);

  const getImageLoadedSize = (size: BaseImageProps) => {
    setModalWidth(size.w + 48);
  };

  return (
    <div>
      <h2>组件名称：图片预览（ImagePreview）</h2>
      <p>基础操作: 滚轮缩放 拖拽</p>
      <p>菜单操作: 旋转 重置</p>
      <div className="g-table">
        <div>
          <h3>简易模式示例</h3>
          <p>单击图片 将等比拉伸至可能的屏幕最大尺寸, 无菜单</p>
          <img
            src={sampleImage}
            alt="图片"
            className="g-sample-image"
            onClick={() => setShow(1)}
          />
          <ImagePreview
            url={sampleImage}
            simpleMode={true}
            visible={show === 1}
            onClose={close}
          />
        </div>

        <div>
          <h3>功能菜单</h3>
          <p>含默认右键菜单</p>
          <img
            alt="图片"
            className="g-sample-image"
            src={sampleImage}
            onClick={() => setShow(2)}
          />
          <ImagePreview
            url={sampleImage}
            operator="default"
            fixedOnScreen={true}
            visible={show === 2}
            onClose={close}
          />
        </div>

        <div>
          <h3>非全屏遮罩模式</h3>
          <p>包含在特定组件, 元素内</p>
          <p>包含于Ant-Modal内</p>
          <img
            alt="图片"
            className="g-sample-image"
            src={sampleImage}
            onClick={() => setShow(3)}
          />
          <Modal
            visible={show === 3}
            width={modalWidth}
            onCancel={close}
            style={{ width: '780px', height: '520px' }}
          >
            <ImagePreview
              url={sampleImage}
              getImageLoadedSize={getImageLoadedSize}
              fixedOnScreen={false}
              operator="default"
              visible={true}
              onClose={close}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default () => <ImagePreviewDemo />;
