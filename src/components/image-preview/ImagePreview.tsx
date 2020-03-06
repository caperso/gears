import { ContextMenu } from 'components/ContextMenu';
import React, { useRef, useState } from 'react';
import { AxisPoint, ImageControlMode } from 'typings/types';
import './index.scss';

interface IProps {
    url: string;
    fixed?: boolean;
    visible?: boolean;
    children?: React.ReactNode;
    onClose?: () => void;
}
const emptyImageProps = {
    w: 0, // width
    h: 0, // height
    r: 0, // rotate
    s: 1, // scale
    l: 0, // left
    t: 0, // top
    centerX: 0,
    centerY: 0,
    wStatic: 0,
    hStatic: 0,
    rotateTime: 0, // 旋转的次数
};

export function ImagePreview(this: any, props: IProps) {
    const { url, children = null, fixed = true, visible, onClose } = props;

    const [imageState, setImageState] = useState(emptyImageProps);

    const [imageLoadedState, setImageLoadedState] = useState(emptyImageProps);

    let image = useRef<HTMLImageElement>(null);

    const imageStyle: React.CSSProperties = {
        cursor: `move`,
        position: `absolute`,
        left: `${imageState.l}px`,
        top: `${imageState.t}px`,
        width: `${imageState.w}px`,
        height: `${imageState.h}px`,
        transform: `translate(-50%, -50%) rotate(${imageState.r}deg) scale(${imageState.s}, ${imageState.s})`,
    };

    /**
     * 调整图片至遮罩的中心, 等比缩放图片, 避免屏幕裁剪
     * @param {HTMLImageElement} node
     * @returns
     */
    const sizing = (node: HTMLImageElement) => {
        const l = window.innerWidth / 2;
        const t = window.innerHeight / 2;

        const wMax = window.innerWidth * 0.9;
        const hMax = window.innerHeight * 0.9 - 100; // 100为底部功能栏高度保留

        const wOrigin = node.naturalWidth; // 初始的图片宽
        const hOrigin = node.naturalHeight; // 初始的图片高度

        const wRatio = wOrigin / wMax;
        const hRatio = hOrigin / hMax;

        const size =
            wRatio < 1 && hRatio < 1
                ? { w: wOrigin, h: hOrigin }
                : wRatio > hRatio
                ? { w: wMax, h: hOrigin / wRatio }
                : { w: wOrigin / hRatio, h: hMax };

        const changedState = { t, l, w: size.w, h: size.h, wStatic: size.w, hStatic: size.h };
        const finalState = { ...imageState, ...changedState };
        setImageState(finalState);
        return finalState;
    };

    /* 初始化容器大小 */
    const handleImageLoaded = () => {
        if (image.current) {
            const changedState = sizing(image.current);
            setImageLoadedState(changedState);
        }
    };

    /* 放大 */
    const zoomIn = (e: React.MouseEvent) => {
        setImageState(state => ({ ...state, w: imageState.w * 1.05, h: imageState.h * 1.05 }));
    };

    /* 缩小 */
    const zoomOut = (e: React.MouseEvent) => {
        setImageState(state => ({ ...state, w: imageState.w * 0.95, h: imageState.h * 0.95 }));
    };

    /* 旋转 */
    const rotate = (e: React.MouseEvent) => {
        setImageState(s => ({ ...s, r: s.r + 90, rotateTime: ++s.rotateTime }));
    };

    /* 重置 */
    const reset = () => {
        setImageState(imageLoadedState);
    };

    /* 关闭预览 */
    const close = (e: React.MouseEvent) => {
        reset();
        if (onClose) {
            onClose();
        }
    };

    /* 特殊行为 */

    /* 滚轮缩放 */
    const toScale = (e: any) => {
        let scaleDelta = e.deltaY < 0 ? +0.05 : -0.05;

        // 捕获鼠标在图片位置
        const relativePoint: AxisPoint = { x: e.clientX - imageState.l, y: e.clientY - imageState.t };

        // 缩放宽高
        let w = imageState.w * (1 + scaleDelta);
        let h = imageState.h * (1 + scaleDelta);

        // 原有的偏移量
        let lastLeft = imageState.l;
        let lastTop = imageState.t;

        // 保持缩放后坐标点与鼠标坐标点重合
        let l = lastLeft - scaleDelta * relativePoint.x;
        let t = lastTop - scaleDelta * relativePoint.y;
        setImageState(s => {
            const updateState = { ...s, w, h, l, t, everRotated: false };
            console.log('origin', s, 'current', updateState);
            return updateState;
        });
    };

    /* 拖拽 */
    const [distToImageBoundary, setDistToImageBoundary] = useState<AxisPoint>({ x: 0, y: 0 });
    const [draggable, setDraggable] = useState(false);

    // 拖拽移动
    const drag = function(e: React.MouseEvent) {
        if (!draggable) {
            return;
        }
        let l = e.clientX - distToImageBoundary.x;
        let t = e.clientY - distToImageBoundary.y;
        setImageState(s => ({ ...s, l, t }));
    };

    // 拖拽开始
    const startMove = (e: React.MouseEvent) => {
        e.preventDefault();
        setDraggable(true);
        setDistToImageBoundary({ x: e.clientX - image.current!.offsetLeft, y: e.clientY - image.current!.offsetTop });
    };

    // 拖拽结束
    const endMove = function(e: React.MouseEvent) {
        setDraggable(false);
    };

    const changeMode = (mode: ImageControlMode) => {
        setControlMode(mode);
    };

    const [controlMode, setControlMode] = useState<ImageControlMode>('drag');
    const menu = (
        <div>
            <p onClick={() => changeMode('rotate')}>自由旋转</p>
            <p onClick={() => changeMode('rotate')}>自由拖拽</p>
            <p onClick={void 0}>下载图片</p>
        </div>
    );

    const startRotate = function(e: React.MouseEvent) {};
    const freeRotate = function(e: React.MouseEvent) {};
    const endRotate = function(e: React.MouseEvent) {};
    const handleMouseDown = (e: React.MouseEvent) => {
        controlMode === 'drag' ? startMove(e) : startRotate(e);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        controlMode === 'drag' ? drag(e) : freeRotate(e);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        controlMode === 'drag' ? endMove(e) : endRotate(e);
    };

    if (!visible) {
        return <></>;
    }
    return (
        <div className={`g-image-preview-wrapper ${fixed ? 'g-fixed-wrapper' : ''}`} onClick={fixed ? close : void 0}>
            {children}
            <div className="g-image-preview-close" onClick={close}>
                X
            </div>
            <ContextMenu menu={menu}>
                <img
                    className={`g-image-preview-image ${fixed ? 'g-image-preview-image-fixed' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onClick={e => e.stopPropagation()} // 遗漏了这里阻止冒泡
                    style={imageStyle}
                    onLoad={handleImageLoaded}
                    ref={image}
                    src={url}
                    alt="图片"
                    onWheel={toScale}
                />
            </ContextMenu>
            <div className="g-image-preview-action-bar" onClick={e => e.stopPropagation()}>
                <i className="g-action" onClick={zoomIn}>
                    +
                </i>
                <i className="g-action" onClick={zoomOut}>
                    -
                </i>
                <i className="g-action" onClick={rotate}>
                    ROTATE
                </i>
                <i className="g-action" onClick={reset}>
                    RESET
                </i>
            </div>
        </div>
    );
}
