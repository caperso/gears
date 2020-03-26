import React, { useState } from 'react';
import './level.less';

export type LevelProps = {
    name: string;
    route: string;
};

// 静态url-Level
interface StaticLevel extends LevelProps {
    static: true;
    deep?: null;
}

// 层级动态url-Level
interface LayerLevel extends LevelProps {
    static?: false;
    deep?: Level[];
}

export type Level = StaticLevel | LayerLevel;

interface Props {
    data: Level[];
    fontSize?: number;
}

interface OneLevelProps {
    level: Level;
    depth: number;
    route: string;
    fontSize: number;
}

export const OneLevel = (props: OneLevelProps) => {
    const { level, depth, route } = props;

    const renderRouteCheck = () => {
        const path = window.location.pathname;
        const result = !!path.match(route);
        return result;
    };

    const [active, setActive] = useState<boolean>(renderRouteCheck());

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

export const Levels = (props: Props) => {
    const { data, fontSize = 45 } = props;
    // const [activeUrl, setActiveUrl] = useState('');

    /**
     * 递归渲染层级菜单
     * @param {Level} item
     * @param {number} [depth=0]
     * @param {string} [lastUrl]
     * @returns {React.ReactNode}
     */
    const recursiveRender = (item: Level, depth: number = 0, lastRoute?: string): React.ReactNode => {
        const route = lastRoute ? `${lastRoute}/${item.route}` : item.route;
        return (
            <div key={item.name}>
                <OneLevel level={item} depth={depth} route={route} fontSize={fontSize} />
                {item.deep && item.deep.map((deepItem: Level) => recursiveRender(deepItem, depth + 1, route))}
            </div>
        );
    };

    return <div className="g-levels-wrapper">{data.map((item: Level) => recursiveRender(item))}</div>;
    //  return <div className="wrapper">{props.data.map((item: LevelProps) => <OneLevel item={item} depth={}></OneLevel>)}</div>;
};
