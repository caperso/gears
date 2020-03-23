/**
 * title: 简易模式示例
 * desc:  基础示例 单击图片 将等比拉伸至可能的屏幕最大尺寸, 无菜单
 */

import React, { useState } from 'react';
import { ImagePreview } from '../ImagePreview';
import './demo.less';

const sampleImage =
  'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

const ImagePreviewDemo = () => {
  const [show, setShow] = useState<boolean>(false);

  const close = () => {
    setShow(false);
  };

  return (
    <div className="g-table">
      <img
        src={sampleImage}
        alt="图片"
        className="g-sample-image"
        onClick={() => setShow(true)}
      />
      <ImagePreview
        url={sampleImage}
        simpleMode={true}
        visible={show}
        onClose={close}
      />
    </div>
  )
}

export default () => {
  return <ImagePreviewDemo />
};
