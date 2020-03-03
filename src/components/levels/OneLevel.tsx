import React, { useState } from 'react';
import './index.scss';
import { Level } from './Levels';

interface Props {
    level: Level;
    depth: number;
    url: string;
    fontSize: number;
}

export const OneLevel = (props: Props) => {
    const { level, depth, url } = props;
    const [active, setActive] = useState(false);

    const activeLevel = (item: Level, url: string) => {
        setActive(s => !s);
        return item.static ? replaceRoute(item.url) : changeRoute(url);
    };

    const replaceRoute = (url: string) => window.location.replace(url);

    const changeRoute = (url: string) => console.log(url);

    const classNameGenerator = (depth: number) => {
        return `g-levels-link ${depth ? 'g-small-font' : ''}`;
    };

    return (
        <div
            key={level.name}
            className={classNameGenerator(depth)}
            onClick={() => activeLevel(level, url)}
            style={active ? { color: '#2dc6ad' } : undefined}
        >
            <span style={{ paddingLeft: `${depth}em` }}></span>
            {level.name}
        </div>
    );
};
