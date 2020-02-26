import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface IProps {
    url: string;
    showPreviewModal: boolean;
    closePreviewModal: () => void;
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
    const { url, showPreviewModal, closePreviewModal } = props;

    const [imageState, setImageState] = useState(initImageState);
    const [containerState, setContainerState] = useState(initContainerState);

    // 设定图片的预设大小
    let container: { current: HTMLDivElement | undefined } = useRef();
    let image: { current: HTMLImageElement | undefined } = useRef();

    /* 初始化容器大小 */
    useEffect(() => {
        /** 根据窗口比例调整内部Modal的限高/宽 */
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
        // 目前modal内无法直接通过ref.current 获得dom元素
        setTimeout(() => {
            if (image.current) {
                sizing(image.current);
            }
        }, 0);
    }, [showPreviewModal]);

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
        if (!image || !image.current) {
            return console.warn('图片元素未找到');
        }
        e.stopPropagation();
        // 缩放差数
        let scaleDelta = e.deltaY < 0 ? +0.05 : -0.05; // 放大*1.05/缩小*0.95
        console.log('缩放比例', scaleDelta);
        // 捕获元素盒子宽高属性
        const rect = image.current.getBoundingClientRect();
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
        if (!image || !image.current) {
            return console.warn('图片元素未找到');
        }
        e.preventDefault();
        e.persist();
        console.log('drag');
        setDraggable(true);
        setDisX(e.clientX - image.current.offsetLeft);
        setDisY(e.clientY - image.current.offsetTop);
    };

    // 拖拽移动
    const startMove = function(e: any) {
        if (!container || !container.current) {
            return console.warn('图片元素未找到');
        }
        if (draggable) {
            let l = e.clientX - disX;
            let t = e.clientY - disY;

            setImageState(s => {
                const updateState = { ...s, l, t };
                return updateState;
            });
            container.current.onselectstart = function() {
                return false;
            };
        }
    };

    // 拖拽结束
    const endMove = function(e: any) {
        if (!container || !container.current) {
            return console.warn('图片元素未找到');
        }
        setDraggable(false);
        container.current.onselectstart = null;
    };

    // 关闭modal 复位图片
    const closeModal = () => {
        closePreviewModal();
        setImageState(initImageState);
        setContainerState(initContainerState);
    };

    const Preview = styled.div`
        #preview-container {
            overflow: hidden;
            position: relative;
            width: ${containerState.w}px;
            height: ${containerState.h}px;
            max-height: ${containerState.hMax}px;
            max-width: ${containerState.wMax}px;
        }
        #preview-image {
            cursor: move;
            position: absolute;
            left: ${imageState.l}px;
            top: ${imageState.t}px;
            width: ${imageState.w}px;
            height: ${imageState.h}px;
            transform: translate3d(0, 0, 0) rotate(${imageState.r}deg) scale(${imageState.s}, ${imageState.s});
        }
    `;

    return (
        <Wrapper>
            <div>图片预览</div>
            <Preview>
                <div id="preview-container"  onMouseMove={startMove} onMouseUp={endMove}>
                    <img id="preview-image" src={url} alt="图片" onWheel={toScale} onMouseDown={drag}  />
                </div>
            </Preview>
            <div className="operation-bar">
                <i className="iconfont operator icon-zoom-in" onClick={zoomIn} />
                <i className="iconfont operator icon-zoom-out" onClick={zoomOut} />
                <i className="iconfont operator icon-rotate" onClick={rotateClockwise} />
                <i className="iconfont operator icon-down-load" />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    top: 40px !important;
    padding-bottom: 0 !important;

    .operation-bar {
        width: 100%;
        height: 50px;
        display: flex;
        line-height: 50px;
        align-items: center;
        flex-flow: row nowrap;
        justify-content: center;
        .operator {
            color: #9d9d96;
            font-size: 26px;
            cursor: pointer;
            margin-left: 30px;
            background: none;
            border: none;
            outline: none;
            :hover {
                color: rgba(0, 120, 215, 0.8);
            }
            &:first-child {
                margin: 0;
            }
        }
    }
`;
