import Collapse from 'antd/lib/collapse/Collapse';
import { CodePaper } from 'components/code-paper/CodePaper';
import { IsolateBlock } from 'components/isolate-block/IsolateBlock';
import { WebFrame } from 'components/web-frame';
import React, { useEffect, useState } from 'react';
import img from '../../../assets/image/panda.png';
import { ImagePreview } from '../ImagePreview';
import './demo.scss';

const { Panel } = Collapse;

export const ImagePreviewDemo = () => {
    const [showDefault, setShowDefault] = useState(false);
    const [showWebImage, setShowWebImage] = useState(false);
    const [webImageUrl, setWebImageUrl] = useState('');

    const showDefaultModal = () => {
        setShowDefault(true);
    };

    const showModal = (text: string) => {
        if (text) {
            setWebImageUrl(text);
            localStorage.setItem('image-preview-url', text);
        }
        setShowWebImage(true);
    };

    const closeDefaultPreview = () => {
        setShowDefault(false);
    };

    const closePreview = () => {
        setShowWebImage(false);
    };

    // 加载本地缓存url
    useEffect(() => {
        const text = localStorage.getItem('image-preview-url');
        if (text) {
            setWebImageUrl(text);
        }
    }, []);

    function callback(key: any) {
        console.log(key);
    }

    return (
        <div>
            <h2>组件名称：图片预览（ImagePreview）</h2>
            <div className="g-table">
                <IsolateBlock>
                    <h4>基本示例</h4>
                    <p>基础操作: 滚轮缩放 拖拽</p>
                    <p>菜单操作: 旋转 重置</p>
                    <img src={img} alt="图片" onClick={showDefaultModal} />
                    <ImagePreview url={img} fixed={true} visible={showDefault} onClose={closeDefaultPreview} />
                </IsolateBlock>

                <IsolateBlock>
                    <h4>功能菜单</h4>
                    <p>右键菜单: </p>
                    <img
                        src={img}
                        alt="https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg"
                        onClick={showDefaultModal}
                    />
                    <ImagePreview
                        url="https://cdn.pixabay.com/photo/2020/03/08/11/21/british-4912211_960_720.jpg"
                        fixed={true}
                        visible={showDefault}
                        onClose={closeDefaultPreview}
                    />
                    <br />
                </IsolateBlock>

                <IsolateBlock>
                    <h4>网络图片</h4>
                    <p>将想要测试图片地址输入(空白使用默认图片)</p>
                    <CodePaper text={webImageUrl} handleClick={showModal} buttonText="显示预览" className="small-size" />
                    <ImagePreview url={webImageUrl} fixed={true} visible={showWebImage} onClose={closePreview} />
                </IsolateBlock>
            </div>

            <Collapse defaultActiveKey={['0']} onChange={callback}>
                <Panel header="文档" key="1">
                    <WebFrame url="https://caperso.github.io/gas-pedal/image-preview"></WebFrame>
                </Panel>
            </Collapse>
        </div>
    );
};
