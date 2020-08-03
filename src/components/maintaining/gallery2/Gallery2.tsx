import React, { useRef, useState, WheelEvent } from 'react';
import './Gallery2.less';
import { Gallery2Props, GalleryUnit } from './types';

interface ImageProps {
  w: number;
  h: number;
  l: number | string;
  t: number | string;
  s: number;
}

const emptyImageProps: ImageProps = {
  w: 0,
  h: 0,
  l: '50',
  t: '50',
  s: 1,
};

export const Gallery2 = ({ images = [], style = {}, className = '' }: Gallery2Props) => {
  const [photos, setPhotos] = useState<GalleryUnit[]>(images);
  const [currentPhoto, setCurrentPhoto] = useState<GalleryUnit>();
  const [imageState, setImageState] = useState(emptyImageProps);
  const slider = useRef<HTMLDivElement>(null);
  const lightImage = useRef<HTMLImageElement>(null);

  const to = (direction: number) => {
    if (!currentPhoto) {
      return;
    }
    const index = photos.findIndex(item => item.name === currentPhoto.name);
    if (photos[index + direction]) {
      setCurrentPhoto(photos[index + direction]);
    }
  };

  const handleArraySlide = (e: WheelEvent) => {
    let slideDelta = e.deltaY < 0 ? -150 : +150;
    const slide = (direction: number) => {
      slider.current!.scroll({
        left: slider.current!.scrollLeft + direction,
        behavior: 'smooth',
      });
    };
    slide(slideDelta);
  };

  /* 初始化容器大小 */
  const handleImageLoaded = () => lightImage.current && sizing(lightImage.current);

  const sizing = (node: HTMLImageElement) => {
    const wOrigin = node.naturalWidth; // 初始的图片宽
    const hOrigin = node.naturalHeight; // 初始的图片高度

    let { width } = document.getElementsByClassName('g-gallery-current-content')[0]?.getBoundingClientRect();
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
    // e.preventDefault();
    e.stopPropagation();
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

  const PlaceHolder = () => (
    <div className="g-gallery-placeholder">
      <p>请选择照片</p>
    </div>
  );

  return (
    <div className={`g-gallery2-wrapper ${className}`} style={style}>
      <div className="g-gallery-current">
        {currentPhoto ? (
          <div className="g-gallery-current-content">
            <div onClick={() => to(-1)} className="g-gallery-slider-action g-gallery-slider-left">
              ←
            </div>

            <div className="g-gallery-current-viewer">
              <img
                style={imageStyle}
                onLoad={handleImageLoaded}
                ref={lightImage}
                src={currentPhoto.url}
                alt="图片"
                onMouseDown={startMove}
                onMouseMove={dragging}
                onMouseUp={endMove}
                onContextMenu={() => setDraggable(false)}
                onWheel={toScale}
                onClick={e => e.stopPropagation()}
              />
            </div>
            <div onClick={() => to(+1)} className="g-gallery-slider-action g-gallery-slider-right">
              →
            </div>
          </div>
        ) : (
          <PlaceHolder />
        )}

        <div className="g-gallery-current-title">{currentPhoto?.name || '选择照片'}</div>
      </div>

      <div className="g-gallery-slider">
        <div ref={slider} className="g-gallery-slider-content" onWheel={handleArraySlide}>
          {photos.map(item => (
            <img
              key={item.name}
              src={item.url}
              className={`g-gallery-slider-item ${currentPhoto?.name === item.name ? 'selected' : ''}`}
              onClick={() => setCurrentPhoto(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
