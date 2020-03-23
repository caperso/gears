/**
 * title: 自定操作栏模式示例
 * desc:  功能菜单 含默认右键菜单
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
        alt="图片"
        src={sampleImage}
        className="g-sample-image"
        onClick={() => setShow(true)}
      />
      <ImagePreview
        url={sampleImage}
        visible={show}
        onClose={close}
        operator="default"
        fixedOnScreen={true}
      />
    </div>
  );
};

export default () => <ImagePreviewDemo />;
