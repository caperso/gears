import { ArrowsAltOutlined, LeftOutlined, RightOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Empty, message, Tooltip } from 'antd';
import React, { useEffect, useRef, useState, WheelEvent } from 'react';
import './ImageSlider.scss';

const emptyImageProps = {
  w: 0,
  h: 0,
  l: '50',
  t: '50',
  s: 1,
};

const photos = [];

export const ImageSlider = () => {
  const [currentPhoto, setCurrentPhoto] = useState();
  const [siderShrink, setSiderShrink] = useState(false);

  const slider = useRef<HTMLDivElement>(null);

  const to = (direction: number) => {
    if (!currentPhoto) {
      return;
    }
    const index = photos.findIndex(item => item.id === currentPhoto.id);
    if (photos[index + direction]) {
      setCurrentPhoto(photos[index + direction]);
    } else {
      message.info('已到头');
    }
  };

  const slide = (direction: number) => {
    slider.current!.scroll({
      left: slider.current!.scrollLeft + direction,
      behavior: 'smooth',
    });
  };

  const lightCanvas = useRef<HTMLCanvasElement>(null);
  const lightImage = useRef<HTMLImageElement>(null);
  const [imageState, setImageState] = useState(emptyImageProps);
  const [currentDefects, setCurrentDefects] = useState<Defect[]>([]); // 当前照片所有缺陷

  useEffect(() => {
    if (currentPhoto) {
      setCurrentDefects(defectList.filter((defect: Defect) => defect.light_name === currentPhoto.light_name));
    } else {
      setCurrentDefects([]);
    }
  }, [currentPhoto, defectList]);

  useEffect(() => {
    if (currentDefects.length && lightCanvas.current) {
      console.log('准备绘制缺陷::', currentDefects);

      lightCanvas.current.width = imageState.w;
      lightCanvas.current.height = imageState.h;
      paintCanvas(currentDefects, lightCanvas.current, lightImage.current, imageState.w, imageState.h, true);
    }
  }, [currentDefects, imageState]);

  /* 初始化容器大小 */
  const handleImageLoaded = () => lightImage.current && sizing(lightImage.current);

  const sizing = (node: HTMLImageElement) => {
    const wOrigin = node.naturalWidth; // 初始的图片宽
    const hOrigin = node.naturalHeight; // 初始的图片高度

    let { width } = document.getElementsByClassName('current-photo-content')[0]?.getBoundingClientRect();
    width = width ? width - 90 * 2 : 900;

    const ratio = wOrigin / hOrigin;

    const size = { w: width, h: width / ratio };

    const changedState = { w: size.w, h: size.h };
    const state = { ...emptyImageProps, ...changedState };
    setImageState(state);
  };

  const imageStyle = {
    left: `${imageState.l}${typeof imageState.l === 'string' ? '%' : 'px'}`,
    top: `${imageState.t}${typeof imageState.t === 'string' ? '%' : 'px'}`,
    width: `${imageState.w}px`,
    height: `${imageState.h}px`,
    transform: `translate(-50%, -50%) scale(${imageState.s})`,
  };

  /* 特殊行为 */
  /* 滚轮缩放 */
  const toScale = (e: WheelEvent) => {
    let scaleDelta = e.deltaY < 0 ? +0.05 : -0.05;
    let s = imageState.s * (1 + scaleDelta);
    setImageState(state => {
      const updateState = { ...state, s };
      return updateState;
    });
  };

  /* 拖拽 */
  const [distToImageBoundary, setDistToImageBoundary] = useState({ x: 0, y: 0 });
  const [draggable, setDraggable] = useState(false);
  /* 拖拽开始 */
  const startMove = (e: any) => {
    e.preventDefault();
    setDraggable(true);
    setDistToImageBoundary({
      x: e.clientX - lightImage.current!.offsetLeft,
      y: e.clientY - lightImage.current!.offsetTop,
    });
  };

  // 拖拽移动
  const dragging = function(e: any) {
    if (!draggable) {
      return;
    }
    let l = e.clientX - distToImageBoundary.x;
    let t = e.clientY - distToImageBoundary.y;
    setImageState(s => ({ ...s, l, t }));
  };

  // 拖拽结束
  const endMove = function() {
    setDraggable(false);
  };

  const handleExpandClick = () => {
    setSiderShrink(!siderShrink);
  };

  const PlaceHolder = () => (
    <div className="photo-placeholder">
      <Empty description="" />
      <p>请选择照片</p>
    </div>
  );

  return (
    <div className="image-slider-wrapper">
      <div className="current-photo">
        <div className="current-photo-title">
          {currentPhoto?.light_name || '照片'}
          <span>备注：{currentPhoto?.brief || ''}</span>
          <Tooltip placement="bottomRight" title={siderShrink ? '任务地图模式' : '看图模式'}>
            {siderShrink ? (
              <ShrinkOutlined onClick={handleExpandClick} className="shrink-button" />
            ) : (
              <ArrowsAltOutlined onClick={handleExpandClick} className="shrink-button" />
            )}
          </Tooltip>
        </div>

        {currentPhoto ? (
          <div className="current-photo-content">
            <div onClick={() => to(-1)} className="slider-action slider-left">
              <LeftOutlined />
            </div>

            <div className="current-photo-viewer">
              <img
                className="image"
                style={imageStyle}
                onLoad={handleImageLoaded}
                ref={lightImage}
                src={currentTask && currentPlant ? joinImageUrl(currentPlant.id, currentTask.id, null, currentPhoto.light_name) : ''}
                alt="图片"
              />
              <canvas
                className="canvas"
                onClick={e => e.stopPropagation()}
                ref={lightCanvas}
                style={imageStyle}
                onMouseDown={startMove}
                onMouseMove={dragging}
                onMouseUp={endMove}
                onContextMenu={() => setDraggable(false)}
                onWheel={toScale}
              />
            </div>
            <div onClick={() => to(+1)} className="slider-action slider-right">
              <RightOutlined />
            </div>
          </div>
        ) : (
          <PlaceHolder />
        )}
      </div>

      <div className="photo-slider">
        <div onClick={() => slide(-500)} className="slider-action array-left">
          <LeftOutlined />
        </div>

        <div ref={slider} className="slider-content">
          {photos.map(item => (
            <img
              key={item.id}
              src={currentTask && currentPlant ? joinImageUrl(currentPlant.id, currentTask.id, null, item.light_name) : ''}
              alt="turbine fails array"
              className={`slider-photo ${currentPhoto?.id === item.id ? 'selected' : ''}`}
              onClick={() => setCurrentPhoto(item)}
            />
          ))}
        </div>

        <div onClick={() => slide(+500)} className="slider-action array-right">
          <RightOutlined />
        </div>
      </div>
    </div>
  );
};
