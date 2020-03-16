import { IsolateBlock } from 'components/isolate-block/IsolateBlock';
import React from 'react';
import { Waterfall } from '../Waterfall';

export const WaterfallDemo = () => {
    return (
        <div>
            <Waterfall>
                <IsolateBlock>123123</IsolateBlock>
                <IsolateBlock>123123</IsolateBlock>
                <IsolateBlock>123123</IsolateBlock>
                <IsolateBlock>123123</IsolateBlock>
            </Waterfall>
        </div>
    );
};
