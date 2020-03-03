import React, { useState } from 'react';
import './index.scss';
import { Level } from './Levels';

interface Props {
    level: Level;
    depth: number;
    route: string;
    fontSize: number;
}

export const OneLevel = (props: Props) => {
    const { level, depth, route } = props;
    const [active, setActive] = useState(false);

    const renderRouteCheck=()=>{

    }

    const activeLevel = (item: Level, route: string) => {
        setActive(s => !s);
        return item.static ? replaceRoute(item.route) : changeRoute(route);
    };

    const replaceRoute = (route: string) => window.location.replace(route);

    const changeRoute = (route: string) => console.log(route);

    const classNameGenerator = (depth: number) => {
        return `g-levels-link ${depth ? 'g-small-font' : ''}`;
    };

    return (
        <div
            key={level.name}
            className={classNameGenerator(depth)}
            onClick={() => activeLevel(level, route)}
            style={active ? { color: '#2dc6ad' } : undefined}
        >
            <span style={{ paddingLeft: `${depth}em` }}></span>
            {level.name}
        </div>
    );
};
