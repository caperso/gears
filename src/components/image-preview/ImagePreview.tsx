// import { ContextMenu } from 'components/ContextMenu';
import ContextMenu from 'components/context-menu/ContextMenu';
import React, { useEffect, useRef, useState } from 'react';
import { AxisPoint, MenuItem } from 'typings/types';
import './ImagePreview.scss';

type ImageControlMode = 'free-rotate' | 'free-drag' | 'ratio-scale';
type ImageAction = 'rotate' | 'drag' | 'ratio-scale' | 'zoom-in' | 'zoom-out' | 'reset';
type ImageOperation = ImageAction | ImageControlMode;

type ImageOperationMap = {
    [key in ImageOperation]?: (props?: any) => void;
};

type OperatorProps = {
    bar: ImageOperation[] | React.ReactElement | null;
    contextMenu: ImageOperation[] | React.ReactElement | null;
};

export interface BaseImageProps {
    w: number; // width
    h: number; // height
    r: number; // rotate
    l: number; // left
    t: number; // top
    translate: string;
}

/*
 * 组件备注相关说明
 * 原始尺寸: 图片的原始尺寸
 * 加载尺寸: 图片所能最大占有屏幕的尺寸
 *
 * url: 图片地址
 * visible:  组件可视状态
 * onClose:  关闭回调
 * operator:  控制条, null 则生成简易模式, 'default' 则生成默认操作栏
 * fixedOnScreen: 是否在整个全屏遮罩固定, 简易模式下(operator = null) 必定为true
 * getImageLoadedSize: 图片加载成功后返回图片的加载尺寸
 */

interface Props {
    url: string;
    visible: boolean;
    onClose: () => void;
    operator: 'default' | OperatorProps | null;
    fixedOnScreen?: boolean;
    getImageLoadedSize?: (state: BaseImageProps) => void;
}

/* Component */

const emptyImageProps: BaseImageProps = { w: 0, h: 0, r: 0, l: 0, t: 0, translate: '-50%' };

const defaultOperator: OperatorProps = {
    bar: ['zoom-in', 'zoom-out', 'free-rotate', 'free-drag', 'reset'],
    contextMenu: ['rotate', 'free-rotate', 'free-drag'],
};

export function ImagePreview(this: any, props: Props) {
    const { url, onClose, visible, getImageLoadedSize = undefined } = props;

    let operator: OperatorProps | null = props.operator ? (props.operator === 'default' ? defaultOperator : props.operator) : null;

    let fixedOnScreen = operator === null ? true : props.fixedOnScreen;

    if (fixedOnScreen === false && operator === null) {
    }

    const [imageLoadedState, setImageLoadedState] = useState<BaseImageProps>(emptyImageProps);

    const [imageState, setImageState] = useState<BaseImageProps>(emptyImageProps);

    let image = useRef<HTMLImageElement>(null);

    const imageStyle: React.CSSProperties = {
        left: `${imageState.l}px`,
        top: `${imageState.t}px`,
        width: `${imageState.w}px`,
        height: `${imageState.h}px`,
        transform: `translate(${imageState.translate}, ${imageState.translate}) rotate(${imageState.r}deg)`,
    };

    const imageStaticStyle: React.CSSProperties = {
        cursor: `move`,
        width: `${imageLoadedState.w}px`,
        height: `${imageLoadedState.h}px`,
        position: 'relative',
        overflow: 'hidden',
    };

    // 禁用document滚轮防止意外滚动
    useEffect(() => {
        const prevent = (e: any) => e.preventDefault();
        const disablePassiveWheelEvent = () => document.addEventListener('wheel', prevent, { passive: false });
        const enablePassiveWheelEvent = () => document.removeEventListener('wheel', prevent);
        if (visible && fixedOnScreen) {
            console.log('%cnow scroll by wheel is blocked', 'color:purple');
            disablePassiveWheelEvent();
        } else {
            console.log('%cnow scroll by wheel is available', 'color:green');
            enablePassiveWheelEvent();
        }
        return enablePassiveWheelEvent;
    }, [visible, fixedOnScreen]);

    /**
     * 调整图片至遮罩的中心, 等比缩放图片, 避免屏幕裁剪
     * @param {HTMLImageElement} node
     * @returns
     */
    const sizing = (node: HTMLImageElement) => {
        const l = fixedOnScreen ? window.innerWidth / 2 : 0; // 非固定时初始为0
        const t = fixedOnScreen ? window.innerHeight / 2 : 0; // 非固定时初始为0

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

        const translate = fixedOnScreen ? '-50%' : '0';

        const changedState = { t, l, w: size.w, h: size.h, translate };
        const finalState = { ...imageState, ...changedState };
        setImageState(finalState);
        setImageLoadedState(finalState);
        return finalState;
    };

    /* 初始化容器大小 */
    const handleImageLoaded = () => {
        console.log('%cimage loaded', 'color:red');
        if (image.current) {
            const changedState = sizing(image.current);
            if (getImageLoadedSize) {
                getImageLoadedSize(changedState);
            }
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
        setControlMode('free-drag');
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

    const [controlMode, setControlMode] = useState<ImageControlMode>('free-drag');

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
        controlMode === 'free-drag' ? startMove(e) : startRotate(e);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        controlMode === 'free-drag' ? dragging(e) : rotating(e);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        controlMode === 'free-drag' ? endMove() : endRotate(e);
    };

    /* 图片操作 */
    const imageOperations: ImageOperationMap = {
        'zoom-in': zoomIn,
        'zoom-out': zoomOut,
        rotate: rotate,
        'free-drag': () => changeMode('free-drag'),
        'free-rotate': () => changeMode('free-rotate'),
        reset: reset,
    };

    /* 右键菜单: 终止当前进行的行为 */
    const disableActions = () => {
        setControlMode('free-drag');
        setDraggable(false);
        setRotatable(false);
    };

    /* 渲染 */

    /* 右键菜单渲染 */
    const renderContextMenu = (): MenuItem[] | React.ReactElement | null => {
        // 不渲染右键菜单
        if (!operator || !operator.contextMenu) {
            return null;
        }

        // 字符串数组
        if (operator.contextMenu instanceof Array) {
            let menuList: MenuItem[] = [];
            for (let name of operator.contextMenu) {
                const method = imageOperations[name];
                if (method) {
                    const newItem: MenuItem = { name, method };
                    menuList = [...menuList, newItem];
                }
            }
            return menuList;
        }

        // 组件
        return operator.contextMenu as React.ReactElement;
    };

    /* 操作栏渲染 */
    const renderBar = (): OperatorProps['bar'] => {
        if (!operator || !operator.bar) {
            return null;
        }
        if (operator.bar instanceof Array) {
            let barOperations: MenuItem[] = [];
            for (let name of operator.bar) {
                const method = imageOperations[name];
                if (method) {
                    const newItem: MenuItem = { name, method };
                    barOperations = [...barOperations, newItem];
                } else {
                    console.warn(`can't find method which refers ${name}`);
                }
            }

            const menu = (
                <div className="g-image-preview-action-bar" onClick={e => e.stopPropagation()}>
                    {barOperations.map(item => (
                        <i key={item.name} onClick={item.method}>
                            {item.name}
                        </i>
                    ))}
                </div>
            );
            return menu;
        }
        return operator.bar;
    };

    const [fullScreenFlag, setFullScreenFlag] = useState(false);

    const easyCursorStyle: React.CSSProperties = { cursor: fullScreenFlag ? 'zoom-out' : 'zoom-in' };

    const toggleFullScreen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const l = window.innerWidth / 2; // 非固定时初始为0
        const t = window.innerHeight / 2; // 非固定时初始为0

        const wMax = window.innerWidth * 0.9 - 48; // 安全边界
        const hMax = window.innerHeight * 0.9 - 48;

        const wRatio = imageLoadedState.w / wMax;
        const hRatio = imageLoadedState.h / hMax;

        const size = wRatio > hRatio ? { w: wMax, h: imageLoadedState.h / wRatio } : { w: imageLoadedState.w / hRatio, h: hMax };

        const translate = fixedOnScreen ? '-50%' : '0';

        setImageState(s => (fullScreenFlag ? imageLoadedState : { ...s, l, t, w: size.w, h: size.h, translate }));
        setFullScreenFlag(s => !s);
    };

    if (!visible) {
        return <></>;
    }

    if (!operator) {
        return (
            <div className={`g-image-preview-wrapper g-fixed`} onClick={close}>
                <div className="g-image-preview-icon-close" onClick={close}>
                    X
                </div>
                <img
                    className={`g-image-preview-image`}
                    onContextMenu={disableActions}
                    onClick={toggleFullScreen}
                    style={{ ...imageStyle, ...easyCursorStyle }}
                    onLoad={handleImageLoaded}
                    ref={image}
                    src={url}
                    alt="图片"
                />
            </div>
        );
    }

    return (
        <div
            className={`g-image-preview-wrapper ${fixedOnScreen ? 'g-fixed' : ''}`}
            style={fixedOnScreen ? {} : imageStaticStyle}
            onClick={fixedOnScreen ? close : void 0}
        >
            {fixedOnScreen && (
                <div className="g-image-preview-icon-close" onClick={close}>
                    X
                </div>
            )}
            <ContextMenu menu={renderContextMenu()}>
                <img
                    className={`g-image-preview-image`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onContextMenu={disableActions}
                    onClick={(e: React.MouseEvent) => e.stopPropagation}
                    style={imageStyle}
                    onLoad={handleImageLoaded}
                    ref={image}
                    src={url}
                    alt="图片"
                    onWheel={toScale}
                />
            </ContextMenu>
            {renderBar()}
        </div>
    );
}
