import React from 'react';
import { DefaultHTMLElementProps } from 'typings/types';
import './IsolateBlock.less';

interface Props extends DefaultHTMLElementProps {
    children: React.ReactNode;
}

export const IsolateBlock = (props: Props) => {
    const { style, className, children } = props;
    return (
        <div className={`g-isolate-block-wrapper ${className}`} style={style}>
            {children}
        </div>
    );
};
