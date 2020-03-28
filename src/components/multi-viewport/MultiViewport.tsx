import React from 'react';
import './MultiViewport.less';

const grid = [0, 1, 2, 3];

const allow = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
];

interface Props {
    children: React.ReactElement | React.ReactElement[];
    disabled?: false;
}

const MultiViewport = () => {
    return (
        <div className="g-viewport-wrapper">
            <div className="g-viewport-unit"></div>
            <div className="g-viewport-unit"></div>
            <div className="g-viewport-unit"></div>
            <div className="g-viewport-unit"></div>
        </div>
    );
};

export default MultiViewport;
