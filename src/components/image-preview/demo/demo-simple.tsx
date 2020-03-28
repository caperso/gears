/**
 * title: 简易模式示例
 * desc:  基础示例 单击图片 将等比拉伸至可能的屏幕最大尺寸, 无菜单
 */

import React, { useState } from 'react';
import { ImagePreview } from '../ImagePreview';
import './demo.less';

const sampleImage = 'https://s1.ax1x.com/2020/03/28/GFfufU.jpg';

const ImagePreviewDemo = () => {
  const [show, setShow] = useState<boolean>(false);

  const close = () => {
    setShow(false);
  };

  return (
    <div className="g-table">
      <img alt="a lovely cat" src={sampleImage} className="g-sample-image" onClick={() => setShow(true)} />
      <ImagePreview url={sampleImage} visible={show} onClose={close} simpleMode={true} />
    </div>
  );
};

export default () => {
  return <ImagePreviewDemo />;
};
