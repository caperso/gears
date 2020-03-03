import React from 'react';
import './index.scss';
import { OneLevel } from './OneLevel';

export type LevelProps = {
    name: string;
    url: string;
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
}

export const Levels = (props: Props) => {
    // const [activeUrl, setActiveUrl] = useState('');

    /**
     * 递归渲染层级菜单
     * @param {Level} item
     * @param {number} [depth=0]
     * @param {string} [lastUrl]
     * @returns {React.ReactNode}
     */
    const recursiveRender = (item: Level, depth: number = 0, lastUrl?: string): React.ReactNode => {
        const url = lastUrl ? `${lastUrl}/${item.url}` : item.url;
        return (
            <div key={item.name}>
                <OneLevel level={item} depth={depth} url={url} />
                {item.deep && item.deep.map((deepItem: Level) => recursiveRender(deepItem, depth + 1, item.url))}
            </div>
        );
    };

    return <div className="g-levels-wrapper">{props.data.map((item: Level) => recursiveRender(item))}</div>;
    //  return <div className="wrapper">{props.data.map((item: LevelProps) => <OneLevel item={item} depth={}></OneLevel>)}</div>;
};
