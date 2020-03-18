import { Checkbox, Modal } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { CodePaper } from 'components/code-paper/CodePaper';
import { IsolateBlock } from 'components/isolate-block/IsolateBlock';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import toc from 'remark-toc';
import img from '../../../assets/image/panda.png';
import markdown from '../doc/image-preview.md';
import { BaseImageProps, ImagePreview } from '../ImagePreview';
import './demo.scss';

const sampleImage = 'https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg';

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

    const showWebImage = (text: string) => {
        if (text) {
            setWebImageUrl(text);
            localStorage.setItem('image-preview-url', text);
        }
        setShow(99);
    };

    // 加载本地缓存url
    useEffect(() => {
        const text = localStorage.getItem('image-preview-url');
        if (text) {
            setWebImageUrl(text);
        }
    }, []);

    const [modalWidth, setModalWidth] = useState(500);

    const getImageLoadedSize = (size: BaseImageProps) => {
        setModalWidth(size.w + 48);
    };

    return (
        <div>
            <h2>组件名称：图片预览（ImagePreview）</h2>
            <p>基础操作: 滚轮缩放 拖拽</p>
            <p>菜单操作: 旋转 重置</p>
            <div className="g-table">
                <IsolateBlock>
                    <h3>简易模式示例</h3>
                    <p>单击图片 将等比拉伸至可能的屏幕最大尺寸, 无菜单</p>
                    <img src={img} alt="图片" className="g-sample-image" onClick={() => setShow(1)} />
                    <ImagePreview url={img} simpleMode={true} visible={show === 1} onClose={close} />
                </IsolateBlock>

                <IsolateBlock>
                    <h3>功能菜单</h3>
                    <p>含默认右键菜单</p>
                    <img alt="图片" className="g-sample-image" src={sampleImage} onClick={() => setShow(2)} />
                    <ImagePreview url={sampleImage} operator="default" fixedOnScreen={true} visible={show === 2} onClose={close} />
                </IsolateBlock>

                <IsolateBlock>
                    <h3>非全屏遮罩模式</h3>
                    <p>包含在特定组件, 元素内</p>
                    <p>包含于Ant-Modal内</p>
                    <img alt="图片" className="g-sample-image" src={sampleImage} onClick={() => setShow(3)} />
                    <Modal visible={show === 3} width={modalWidth} onCancel={close} style={{ width: '780px', height: '520px' }}>
                        <ImagePreview
                            url={sampleImage}
                            getImageLoadedSize={getImageLoadedSize}
                            fixedOnScreen={false}
                            operator="default"
                            visible={show === 3}
                            onClose={close}
                        />
                    </Modal>
                </IsolateBlock>

                <IsolateBlock>
                    <h4>组件测试</h4>
                    <p>将想要测试图片地址输入(空白使用默认图片)</p>
                    <CodePaper text={webImageUrl} handleClick={showWebImage} buttonText="显示预览" className="small-size" />
                    <CheckboxGroup>
                        <label>
                            <Checkbox></Checkbox>
                            简易模式
                        </label>
                        <label>
                            <Checkbox></Checkbox>
                            遮罩固定
                        </label>
                    </CheckboxGroup>
                    <ImagePreview url={webImageUrl} simpleMode={true} visible={show === 99} onClose={close} />
                </IsolateBlock>
            </div>
            <ReactMarkdown source={doc} plugins={[toc]}></ReactMarkdown>
        </div>
    );
};
