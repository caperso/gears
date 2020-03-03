import React from 'react';
import './index.scss';
import { LevelProps } from './Levels';

export const OneLevel = (item: LevelProps, depth: number) => {
    const classNameGenerator = (depth: number) => {
        return `link `;
    };


    const changeRoute = (url: string) => {
        // if (active) {
        //     //TODO: change to sallower level url
        //     // history.push('/');
        // } else {
        //     // history.push(url);
        // }
        // setActive(s => !s);
    };

    const replaceRoute = (url: string) => window.location.replace(url);
    /**
     * find url whether at current or root or not
     * @param {string} param
     * @returns
     */

    const activeLevel = (item: LevelProps) => {
        return item.static ? () => replaceRoute(item.url) : () => changeRoute(item.url);
    };


    return (
        <div
            key={item.name}
            className={classNameGenerator(depth)}
            data-item={item}
            onClick={() => activeLevel(item)}
            // style={active ? { color: '#2dc6ad' } : undefined}
        >
            <span style={{ paddingLeft: `${depth}em` }}></span>
            {item.name}
        </div>
    );
};
