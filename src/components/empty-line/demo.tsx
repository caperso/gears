import React from 'react';
import { EmptyLine } from '../empty-line';

export const EmptyLineDemo = () => {
    return (
        <div>
            <h3>组件名称：空行（EmptyLine）</h3>
            <p>自定义组件，默认高度 20 ，宽度 100%</p>
            <p>第一行文字</p>
            <EmptyLine />
            <p>第二行文字</p>
        </div>
    );
};
