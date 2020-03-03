import React from 'react';
import './index.scss';
import { OneLevel } from './OneLevel';

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
