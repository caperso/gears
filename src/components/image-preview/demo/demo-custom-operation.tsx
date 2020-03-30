/**
 * title: 自定操作栏选项
 * desc:  功能菜单 含默认右键菜单
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
      <ImagePreview url={sampleImage} visible={show} onClose={close} operatorBar="default" fixedOnScreen={true} />
    </div>
  );
};

export default () => <ImagePreviewDemo />;
