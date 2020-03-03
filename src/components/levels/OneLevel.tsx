import React from 'react';
import { LevelProps } from "./Levels";

const activeLevel = (item: LevelProps) => {
    return item.static ? () => replaceRoute(item.url) : () => changeRoute(item.url);
};

const replaceRoute = (url: string) => window.location.replace(url);

const changeRoute = (url: string) => {
    // if (active) {
    //     //TODO: change to sallower level url
    //     // history.push('/');
    // } else {
    //     // history.push(url);
    // }
    // setActive(s => !s);
};

const classNameGenerator = (depth: number) => {
    return `g-levels-link `;
};


export const OneLevel = (item: LevelProps, depth: number) => {
    console.log('key', item.name);

    return (
        <div
            key={item.name}
            className={classNameGenerator(depth)}
            onClick={() => activeLevel(item)}
            // style={active ? { color: '#2dc6ad' } : undefined}
        >
            <span style={{ paddingLeft: `${depth}em` }}></span>
            {item.name}
        </div>
    );
};