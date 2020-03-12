import React from 'react';
import './IsolateBlock.scss';

interface Props {
    children: React.ReactNode;
}

export const IsolateBlock = (props: Props) => {
    return <div className="g-isolate-block-wrapper">{props.children}</div>;
};
