import { Modal } from 'antd';
import React, { useRef, useState } from 'react';
import './index.scss';

interface IProps {
    url: string;
    title?: string;
    showPreview: boolean;
    closePreview: () => void;
}

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

const initContainerState = {
    w: 0, // width
    h: 0, // height
    wMax: 0,
    hMax: 0,
};

export function ImagePreview(this: any, props: IProps) {
    const { url, showPreview, closePreview, title = '图片预览' } = props;

    const [imageState, setImageState] = useState(initImageState);
    const [containerState, setContainerState] = useState(initContainerState);

    // 设定图片的预设大小
    let container = useRef<HTMLDivElement>(null);
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

        setContainerState(state => {
            return { ...state, wMax, hMax, w: size.w, h: size.h };
        });
    };

    const handleImageLoaded = () => {
        if (image.current) {
            sizing(image.current);
        }
    };

    // 放大
    const zoomIn = () => setImageState(state => ({ ...state, w: imageState.w * 1.05, h: imageState.h * 1.05 }));

    // 缩小
    const zoomOut = () => setImageState(state => ({ ...state, w: imageState.w * 0.95, h: imageState.h * 0.95 }));

    // 顺时针旋转
    const rotateClockwise = () => {
        setImageState(s => {
            const updateState = { ...s };
            updateState.l = 0;
            updateState.t = 0;
            updateState.everRotated = true;
            updateState.r = s.r + 90;
            updateState.rotateTime = ++s.rotateTime;
            return updateState;
        });
        setContainerState(s => {
            const updatedState = { ...s };
            // 宽图扩展高,长图扩展宽
            const ratio = imageState.wStatic / imageState.hStatic;
            ratio > 1 ? (updatedState.h = s.w) : (updatedState.w = s.h);
            return updatedState;
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
        e.preventDefault();
        e.persist();
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
            container.current!.onselectstart = function() {
                return false;
            };
        }
    };

    // 拖拽结束
    const endMove = function(e: any) {
        setDraggable(false);
        container.current!.onselectstart = null;
    };

    // 关闭modal 复位图片
    const closeModal = () => {
        closePreview();
        setImageState(initImageState);
        setContainerState(initContainerState);
    };

    // doesn't work
    // const containerStyle = {
    //     overflow: 'hidden',
    //     position: 'relative',
    //     width: `${containerState.w}px`,
    //     height: `${containerState.h}px`,
    //     maxHeight: `${containerState.hMax}px`,
    //     maxWidth: `${containerState.wMax}px`,
    // };

    // doesn't work
    // const imageStyle = {
    //     cursor: ` move`,
    //     position: ` absolute`,
    //     left: ` ${imageState.l}px`,
    //     top: ` ${imageState.t}px`,
    //     width: ` ${imageState.w}px`,
    //     height: ` ${imageState.h}px`,
    //     transform: ` translate3d(0, 0, 0) rotate(${imageState.r}deg) scale(${imageState.s}, ${imageState.s})`,
    // };

    return (
        <Modal className="preview-modal" onCancel={closeModal} footer={null} visible={showPreview}>
            <div>{title}</div>
            <div
                ref={container}
                style={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: `${containerState.w}px`,
                    height: `${containerState.h}px`,
                    maxHeight: `${containerState.hMax}px`,
                    maxWidth: `${containerState.wMax}px`,
                }}
                onMouseMove={startMove}
                onMouseUp={endMove}
            >
                <img
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
                    onMouseDown={drag}
                />
            </div>
            <div className="operation-bar">
                <i className="iconfont operator" onClick={zoomIn}>
                    +
                </i>
                <i className="iconfont operator" onClick={zoomOut}>
                    -
                </i>
                <i className="iconfont operator" onClick={rotateClockwise}>
                    R
                </i>
                <i className="iconfont operator">D</i>
            </div>
        </Modal>
    );
}
