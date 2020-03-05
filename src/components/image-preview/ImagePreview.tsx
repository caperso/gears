import React, { useRef, useState } from 'react';
import './index.scss';

interface IProps {
    url: string;
    fixed?: boolean;
    visible?: boolean;
    children?: React.ReactNode;
    onClose?: () => void;
}
type AxisPoint = { x: number; y: number };
type ActionTypes = 'zoomIn' | 'zoomOut' | 'rotate' | 'reset';
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

    const [imageLoadedState, setImageLoadedState] = useState();

    let image = useRef<HTMLImageElement>(null);

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
    const zoomIn = (e: React.SyntheticEvent) => {
        setImageState(state => ({ ...state, w: imageState.w * 1.05, h: imageState.h * 1.05 }));
    };

    /* 缩小 */
    const zoomOut = (e: React.SyntheticEvent) => {
        setImageState(state => ({ ...state, w: imageState.w * 0.95, h: imageState.h * 0.95 }));
    };

    /* 旋转 */
    const rotate = (e: React.SyntheticEvent) => {
        setImageState(s => {
            const updateState = { ...s };
            updateState.l = 0;
            updateState.t = 0;
            updateState.r = s.r + 90;
            updateState.rotateTime = ++s.rotateTime;
            return updateState;
        });
        e.stopPropagation();
    };

    /* 滚轮缩放 */
    const toScale = (e: any) => {
        let scaleDelta = e.deltaY < 0 ? +0.05 : -0.05;

        // 捕获鼠标在图片位置
        const relativePoint: AxisPoint = { x: e.clientX - imageState.l, y: e.clientY - imageState.t };

        // 捕获元素盒子宽高属性
        const rect = image.current!.getBoundingClientRect();
        let imageWidth = rect.width;
        let imageHeight = rect.height;
        console.log('图片对窗口左偏移量', rect.left, '光标对窗口左偏移量', e.clientX);
        // // 当图片是奇数次旋转时宽高对调
        // const needExchange = imageState.rotateTime % 2 === 1;
        // if (needExchange) {
        //     [imageWidth, imageHeight] = [imageHeight, imageWidth];
        // }
        // 缩放宽高
        let w = imageState.w * (1 + scaleDelta);
        let h = imageState.h * (1 + scaleDelta);
        // 原有的偏移量
        let lastLeft = imageState.l;
        let lastTop = imageState.t;
        /*
         * 本行为目的:
         * 之前经历过旋转,在下一次缩放时, 即刻调整其l,t参考点到旋转后的左上角,在计算其缩放后的偏移值
         * 解释:翻转后,state内的l,t参考点仍是翻转前的左上角,css翻转不会改变state内参数
         * 在此将参考点偏移到目前左上角, 计算最终图片l, t偏移量, 并且关闭everRotated
         */
        // if (needExchange && imageState.everRotated) {
        //     const deltaW = Math.abs(0.5 * (rect.width - rect.height))
        //     const deltaH = Math.abs(0.5 * (rect.height - rect.width))
        //     if (imageWidth / imageHeight >= 1) {
        //         // 超高图=>超宽图
        //         lastTop += deltaH
        //         lastLeft -= deltaW
        //     } else {
        //         // 超高图=>超宽图
        //         lastTop -= deltaH
        //         lastLeft += deltaW
        //     }
        // }

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
    const dragging = function(e: any) {
        if (!draggable) {
            return;
        }
        let l = e.clientX - distToImageBoundary.x;
        let t = e.clientY - distToImageBoundary.y;
        setImageState(s => ({ ...s, l, t }));
    };

    // 拖拽开始
    const startMove = (e: any) => {
        e.preventDefault();
        setDraggable(true);
        setDistToImageBoundary({ x: e.clientX - image.current!.offsetLeft, y: e.clientY - image.current!.offsetTop });
    };

    // 拖拽结束
    const endMove = function(e: React.SyntheticEvent) {
        setDraggable(false);
    };

    /* 重置 */
    const reset = function(e: React.SyntheticEvent) {
        setImageState(imageLoadedState);
    };

    const close = (e: React.SyntheticEvent) => {
        if (onClose) {
            onClose();
        }
    };

    const imageStyle: React.CSSProperties = {
        cursor: `move`,
        position: `absolute`,
        left: `${imageState.l}px`,
        top: `${imageState.t}px`,
        width: `${imageState.w}px`,
        height: `${imageState.h}px`,
        transform: `translate(-50%, -50%) rotate(${imageState.r}deg) scale(${imageState.s}, ${imageState.s})`,
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
            <img
                className={`g-image-preview-image ${fixed ? 'g-image-preview-image-fixed' : ''}`}
                onMouseDown={startMove}
                onMouseMove={dragging}
                onMouseUp={endMove}
                onClick={e => e.stopPropagation()} // 遗漏了这里阻止冒泡
                style={imageStyle}
                onLoad={handleImageLoaded}
                ref={image}
                src={url}
                alt="图片"
                onWheel={toScale}
            />
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
