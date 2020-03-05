import React, { useEffect, useRef, useState } from 'react';
import './index.scss';

interface IProps {
    url: string;
    fixed?: boolean;
    visible?: boolean;
    children?: React.ReactNode;
}

type ActionTypes = 'zoomIn' | 'zoomOut' | 'rotate' | 'reset';
const initImageState = {
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
    everRotated: false, // 之前是否经历过旋转
};

export function ImagePreview(this: any, props: IProps) {
    const { url, children = null, fixed = true } = props;

    const [imageState, setImageState] = useState(initImageState);
    const [visible, setVisible] = useState(props.visible || false);

    // 设定图片的预设大小
    let image = useRef<HTMLImageElement>(null);

    /* 初始化容器大小 */
    const sizing = (node: HTMLImageElement) => {
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

        setImageState(state => {
            const updatedState = { w: size.w, h: size.h, wStatic: size.w, hStatic: size.h };
            console.log('图片元素更新状态', updatedState);
            return { ...state, ...updatedState };
        });
    };

    const handleImageLoaded = () => {
        if (image.current) {
            sizing(image.current);
        }
    };

    // 放大
    const zoomIn = (e: MouseEvent) => {
        e.stopPropagation();
        setImageState(state => ({ ...state, w: imageState.w * 1.05, h: imageState.h * 1.05 }));
    };

    // 缩小
    const zoomOut = (e: MouseEvent) => {
        e.stopPropagation();
        setImageState(state => ({ ...state, w: imageState.w * 0.95, h: imageState.h * 0.95 }));
    };

    // 顺时针旋转
    const rotate = () => {
        setImageState(s => {
            const updateState = { ...s };
            updateState.l = 0;
            updateState.t = 0;
            updateState.everRotated = true;
            updateState.r = s.r + 90;
            updateState.rotateTime = ++s.rotateTime;
            return updateState;
        });
    };

    /* 滚轮时缩放 */
    const toScale = (e: any) => {
        e.stopPropagation();

        // 缩放差数
        let scaleDelta = e.deltaY < 0 ? +0.05 : -0.05; // 放大*1.05/缩小*0.95
        console.log('缩放比例', scaleDelta);
        // 捕获元素盒子宽高属性
        const rect = image.current!.getBoundingClientRect();
        const imageOffWindowLeft = rect.left;
        const imageOffWindowTop = rect.top;
        let imageWidth = rect.width;
        let imageHeight = rect.height;
        console.log('图片对窗口左偏移量', rect.left, '光标对窗口左偏移量', e.clientX);
        // 当图片是奇数次旋转时宽高对调
        const needExchange = imageState.rotateTime % 2 === 1;
        if (needExchange) {
            [imageWidth, imageHeight] = [imageHeight, imageWidth];
        }
        // 缩放宽高
        let w = imageWidth * (1 + scaleDelta);
        let h = imageHeight * (1 + scaleDelta);
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
        // 保持缩放坐标点与鼠标坐标点重合
        let l = lastLeft - scaleDelta * (e.clientX - imageOffWindowLeft);
        let t = lastTop - scaleDelta * (e.clientY - imageOffWindowTop);
        setImageState(s => {
            const updateState = { ...s, w, h, l, t, everRotated: false };
            console.log('origin', s, 'current', updateState);
            return updateState;
        });
    };

    const [disX, setDisX] = useState(0);
    const [disY, setDisY] = useState(0);
    const [draggable, setDraggable] = useState(false);

    // 拖拽开关
    const drag = (e: any) => {
        e.persist();
        e.stopPropagation();
        e.preventDefault();
        console.log('drag');
        setDraggable(true);
        setDisX(e.clientX - image.current!.offsetLeft);
        setDisY(e.clientY - image.current!.offsetTop);
    };

    // 拖拽移动
    const startMove = function(e: any) {
        if (draggable) {
            let l = e.clientX - disX;
            let t = e.clientY - disY;

            setImageState(s => {
                const updateState = { ...s, l, t };
                return updateState;
            });
            image.current!.onselectstart = function() {
                return false;
            };
        }
    };

    // 拖拽结束
    const endMove = function(e: any) {
        setDraggable(false);
        image.current!.onselectstart = null;
    };

    const reset = function(e: any) {
        setImageState(initImageState);
    };

    useEffect(() => {
        console.log(props.visible);
        setVisible(!!props.visible);
    }, [props.visible]);

    const close = (e: MouseEvent) => {
        console.log('ra');
        
        // setVisible(false);
    };

    const action = (e: any, handler: (e: MouseEvent) => void) => {
        e.preventDefault();
        e.persist();
        e.stopPropagation();
        handler(e);
    };

    return (
        <div
            className={`g-image-preview-wrapper ${fixed ? 'g-fixed-wrapper' : ''}`}
            style={{ display: visible ? 'block' : 'none' }}
            onClick={fixed ? (e:any)=> close(e) : void 0}
        >
            {children}
            <img
                className={`g-image-preview-image ${fixed ? 'g-image-preview-image-fixed' : ''}`}
                onMouseDown={(event: any) => action(event, drag)}
                onMouseMove={(event: any) => action(event, startMove)}
                onMouseUp={(event: any) => action(event, endMove)}
                style={{
                    cursor: `move`,
                    position: `absolute`,
                    left: `${imageState.l}px`,
                    top: `${imageState.t}px`,
                    width: `${imageState.w}px`,
                    height: `${imageState.h}px`,
                    transform: `translate3d(0, 0, 0) rotate(${imageState.r}deg) scale(${imageState.s}, ${imageState.s})`,
                }}
                onLoad={handleImageLoaded}
                ref={image}
                src={url}
                alt="图片"
                onWheel={toScale}
            />
            <div className="g-image-preview-action-bar">
                <i className="g-action" onClick={(e: any) => action(e, zoomIn)}>
                    +
                </i>
                <i className="g-action" onClick={(e: any) => action(e, zoomOut)}>
                    -
                </i>
                <i className="g-action" onClick={(e: any) => action(e, rotate)}>
                    ROTATE
                </i>
                <i className="g-action" onClick={(e: any) => action(e, reset)}>
                    RESET
                </i>
            </div>
        </div>
    );
}
