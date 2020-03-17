import { Modal } from 'antd';
import { CodePaper } from 'components/code-paper/CodePaper';
import { IsolateBlock } from 'components/isolate-block/IsolateBlock';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import toc from 'remark-toc';
import img from '../../../assets/image/panda.png';
import markdown from '../doc/image-preview.md';
import { ImagePreview } from '../ImagePreview';
import './demo.scss';

const largeSample = 'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

export const ImagePreviewDemo = () => {
    const [show, setShow] = useState<number | null>(-1);

    const [webImageUrl, setWebImageUrl] = useState('');

    const [doc, setDoc] = useState('');

    useEffect(() => {
        fetch(markdown)
            .then(res => res.text())
            .then(text => setDoc(text));
    }, []);

    const close = () => {
        setShow(null);
    };

    const showDefault = () => {
        setShow(0);
    };

    const showDefaultLarge = () => {
        setShow(1);
    };

    const showWebImage = (text: string) => {
        if (text) {
            setWebImageUrl(text);
            localStorage.setItem('image-preview-url', text);
        }
        setShow(2);
    };

    // 加载本地缓存url
    useEffect(() => {
        const text = localStorage.getItem('image-preview-url');
        if (text) {
            setWebImageUrl(text);
        }
    }, []);

    return (
        <div>
            <h2>组件名称：图片预览（ImagePreview）</h2>
            <p>基础操作: 滚轮缩放 拖拽</p>
            <p>菜单操作: 旋转 重置</p>
            <div className="g-table">
                <IsolateBlock>
                    <h4>基本示例</h4>
                    <p>无菜单</p>
                    <img src={img} alt="图片" className="g-sample-image" onClick={showDefault} />
                    <ImagePreview
                        url={img}
                        fixedOnScreen={true}
                        visible={show === 0}
                        onClose={close}
                        operator={{ bar: null, contextMenu: null }}
                    />
                </IsolateBlock>

                <IsolateBlock>
                    <h4>功能菜单</h4>
                    <p>含默认右键菜单</p>
                    <img alt="图片" className="g-sample-image" src={largeSample} onClick={showDefaultLarge} />
                    <ImagePreview url={largeSample} fixedOnScreen={true} visible={show === 1} onClose={close} />
                </IsolateBlock>

                <IsolateBlock>
                    <h4>非全屏遮罩</h4>
                    <p>可包含在特定组件, 元素内</p>
                    <img alt="图片" className="g-sample-image" src={largeSample} onClick={showDefaultLarge} />
                    <Modal>
                        <ImagePreview url={largeSample} fixedOnScreen={false} visible={show === 3} onClose={close} />
                    </Modal>
                </IsolateBlock>

                <IsolateBlock>
                    <h4>网络图片</h4>
                    <p>默认菜单</p>
                    <p>将想要测试图片地址输入(空白使用默认图片)</p>

                    <CodePaper text={webImageUrl} handleClick={showWebImage} buttonText="显示预览" className="small-size" />
                    <ImagePreview
                        url={webImageUrl}
                        operator={{ bar: null, contextMenu: ['zoom-in', 'zoom-out'] }}
                        fixedOnScreen={true}
                        visible={show === 2}
                        onClose={close}
                    />
                </IsolateBlock>
            </div>
            <ReactMarkdown source={doc} plugins={[toc]}></ReactMarkdown>
        </div>
    );
};
