// import { ContextMenu } from 'components/ContextMenu';
import ContextMenu from 'components/context-menu/ContextMenu';
import React, { useEffect, useRef, useState } from 'react';
import { AxisPoint, ContextMenuProps, ImageControlMode, ImageOperations } from 'typings/types';
import './ImagePreview.scss';

type Operator = {
    bar: 'default-bar' | React.ReactNode | null;
    contextMenu: ContextMenuProps;
};

interface Props {
    url: string;
    visible: boolean;
    onClose: () => void;
    fixed?: boolean;
    operator?: Operator;
}

interface BaseImageProps {
    w: number; // width
    h: number; // height
    r: number; // rotate
    l: number; // left
    t: number; // top
}

const emptyImageProps = { w: 0, h: 0, r: 0, l: 0, t: 0 };

export function ImagePreview(this: any, props: Props) {
    const { url, fixed = true, visible, onClose, operator = { bar: 'default-bar', contextMenu: 'default-context-menu' } } = props;

    const [imageState, setImageState] = useState<BaseImageProps>(emptyImageProps);

    const [imageLoadedState, setImageLoadedState] = useState<BaseImageProps>(emptyImageProps);

    let image = useRef<HTMLImageElement>(null);

    const imageStyle: React.CSSProperties = {
        cursor: `move`,
        position: `absolute`,
        left: `${imageState.l}px`,
        top: `${imageState.t}px`,
        width: `${imageState.w}px`,
        height: `${imageState.h}px`,
        transform: `translate(-50%, -50%) rotate(${imageState.r}deg)`,
    };

    // 禁用document滚轮防止意外滚动
    useEffect(() => {
        const prevent = (e: any) => e.preventDefault();
        const disablePassiveWheelEvent = () => document.addEventListener('wheel', prevent, { passive: false });
        const enablePassiveWheelEvent = () => document.removeEventListener('wheel', prevent);
        if (visible) {
            disablePassiveWheelEvent();
        } else {
            enablePassiveWheelEvent();
        }
        return enablePassiveWheelEvent;
    }, [visible]);

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

        const changedState = { t, l, w: size.w, h: size.h };
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
    const zoomIn = () => {
        setImageState(state => ({ ...state, w: imageState.w * 1.05, h: imageState.h * 1.05 }));
    };

    /* 缩小 */
    const zoomOut = () => {
        setImageState(state => ({ ...state, w: imageState.w * 0.95, h: imageState.h * 0.95 }));
    };

    /* 旋转 */
    const rotate = () => {
        setImageState(s => ({ ...s, r: s.r + 90 }));
    };

    /* 重置 */
    const reset = () => {
        setControlMode('drag');
        setRotatable(false);
        setDraggable(false);
        setImageState(imageLoadedState);
    };

    /* 关闭预览 */
    const close = () => {
        reset();
        if (onClose) {
            onClose();
        }
    };

    /* 特殊行为 */

    /* 滚轮缩放 */
    const toScale = (e: React.WheelEvent) => {
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
            const updateState = { ...s, w, h, l, t };
            return updateState;
        });
    };

    const [controlMode, setControlMode] = useState<ImageControlMode>('drag');

    const changeMode = (mode: ImageControlMode) => setControlMode(mode);

    /* 拖拽 */
    const [distToImageBoundary, setDistToImageBoundary] = useState<AxisPoint>({ x: 0, y: 0 });
    const [draggable, setDraggable] = useState(false);

    // 拖拽开始
    const startMove = (e: React.MouseEvent) => {
        e.preventDefault();
        setDraggable(true);
        setDistToImageBoundary({ x: e.clientX - image.current!.offsetLeft, y: e.clientY - image.current!.offsetTop });
    };

    // 拖拽移动
    const dragging = function(e: React.MouseEvent) {
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

    /* 自由旋转 */
    const [rotatable, setRotatable] = useState(false);
    const [pointA, setPointA] = useState<AxisPoint>({ x: 0, y: 0 });
    const startRotate = function(e: React.MouseEvent) {
        e.preventDefault();
        setPointA({ x: e.clientX, y: e.clientY });
        setRotatable(true);
    };

    const rotating = function(e: React.MouseEvent) {
        if (!rotatable) {
            return;
        }

        const pointB = { x: e.clientX, y: e.clientY };

        const getLine = (point1: AxisPoint, point2: AxisPoint): number =>
            Math.sqrt(Math.pow(Math.abs(point1.x - point2.x), 2) + Math.pow(Math.abs(point1.y - point2.y), 2));

        const { left, right, top, bottom } = image.current!.getBoundingClientRect();
        const pointO = { x: (left + right) / 2, y: (top + bottom) / 2 };
        const a = getLine(pointB, pointA);
        const b = getLine(pointB, pointO);
        const c = getLine(pointA, pointO);

        let cosO = (b * b + c * c - a * a) / (2 * b * c);
        let degree = (Math.acos(cosO) * 180) / 3.1415;

        // 求向量积
        let matrix = [
            [pointA.x - pointO.x, pointB.x - pointO.x],
            [pointA.y - pointO.y, pointB.y - pointO.y],
        ];
        let direct = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0] >= 0 ? +1 : -1;

        setImageState(s => ({ ...s, r: s.r + direct * degree }));
        setPointA(pointB);
    };

    const endRotate = function(e: React.MouseEvent) {
        setPointA({ x: e.clientX, y: e.clientY });
        setRotatable(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        controlMode === 'drag' ? startMove(e) : startRotate(e);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        controlMode === 'drag' ? dragging(e) : rotating(e);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        controlMode === 'drag' ? endMove() : endRotate(e);
    };

    /* 渲染 */

    /* 右键菜单渲染 */
    const renderContextMenu = (): Operator['contextMenu'] => {
        if (!operator.contextMenu) {
            return null;
        }
        if (operator.contextMenu === 'default-context-menu') {
            const defaultMenu = (
                <div>
                    <p onClick={() => changeMode('rotate')}>自由旋转</p>
                    <p onClick={() => changeMode('drag')}>自由拖拽</p>
                    <p onClick={() => changeMode('ratio-scale')}>(开发中)比例缩放</p>
                    <a href={url}>下载图片</a>
                </div>
            );
            return defaultMenu;
        }

        return operator.contextMenu;
    };

    /* 操作栏渲染 */
    const renderBar = (): Operator['bar'] => {
        if (!operator.bar) {
            return null;
        }

        if (operator.bar === 'default-bar') {
            const imageOperations: ImageOperations[] = [];
            const imageOperationsMap = new Map([
                ['zoom-in', zoomIn],
                ['zoom-out', zoomOut],
                ['rotate', rotate],
                ['free-drag', () => changeMode('drag')],
                ['free-rotate', () => changeMode('rotate')],
                ['reset', reset],
            ]);

            const defaultMenu = (
                <div className="g-image-preview-action-bar" onClick={e => e.stopPropagation()}>
                    <i onClick={zoomIn}>+</i>
                    <i onClick={zoomOut}>-</i>
                    <i onClick={rotate}>ROTATE</i>
                    <i onClick={() => changeMode('drag')}>FREE DRAG</i>
                    <i onClick={() => changeMode('rotate')}>FREE ROTATE</i>
                    <i onClick={reset}>RESET</i>
                </div>
            );
            return defaultMenu;
        }

        return operator.bar;
    };

    if (!visible) {
        return <></>;
    }

    return (
        <div className={`g-image-preview-wrapper ${fixed ? 'g-fixed-wrapper' : ''}`} onClick={fixed ? close : void 0}>
            <div className="g-image-preview-close" onClick={close}>
                X
            </div>
            <ContextMenu menu={renderContextMenu()}>
                <img
                    className={`g-image-preview-image ${fixed ? 'g-image-preview-image-fixed' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={imageStyle}
                    onLoad={handleImageLoaded}
                    ref={image}
                    src={url}
                    alt="图片"
                    onWheel={toScale}
                />
            </ContextMenu>
            {renderBar}
        </div>
    );
}
