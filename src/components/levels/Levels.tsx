import React, { useState } from 'react';
import './index.scss';

export interface LevelProps {
    name: string;
    url: string;
    static?: boolean;
    deep?: LevelProps[];
}

interface Props {
    data: LevelProps[];
}

export const Levels = (props: Props) => {
    const [active, setActive] = useState(false);

    const changeRoute = (url: string) => {
        if (active) {
            //TODO: change to sallower level url
            // history.push('/');
        } else {
            // history.push(url);
        }
        setActive(s => !s);
    };

    const replaceRoute = (url: string) => window.location.replace(url);
    // /**
    //  * find url whether at current or root or not
    //  * @param {string} param
    //  * @returns
    //  */
    // const findReg = (param: string) => {
    //     // eslint-disable-next-line no-useless-escape
    //     let reg = new RegExp(`^\/(${param})|(\/)$`, 'g');
    //     return window.location.pathname.match(reg);
    // };

    const activeLevel = (item: LevelProps) => {
        return item.static ? () => replaceRoute(item.url) : () => changeRoute(item.url);
    };

    const classNameGenerator = (depth: number) => {
        return `g-levels-link `;
    };

    const oneLevel = (item: LevelProps, depth: number) => {
        console.log('key', item.name);

        return (
            <div
                key={item.name}
                className={classNameGenerator(depth)}
                onClick={() => activeLevel(item)}
                style={active ? { color: '#2dc6ad' } : undefined}
            >
                <span style={{ paddingLeft: `${depth}em` }}></span>
                {item.name}
            </div>
        );
    };

    /**
     * 递归渲染层级菜单
     * @param {LevelProps} item
     * @param {number} [depth=0]
     * @returns {React.ReactNode}
     */
    const recursiveRender = (item: LevelProps, depth: number = 0): React.ReactNode => {
        if (item.deep) {
            return (
                <div key={item.name}>
                    {oneLevel(item, depth)}
                    {item.deep.map(deepItem => recursiveRender(deepItem, depth + 1))}
                </div>
            );
        }
        return <div key={item.name}>{oneLevel(item, depth)}</div>;
    };

    return (
        <div className="g-levels-wrapper">
            {props.data.map((item: LevelProps) =>
                // <div key={item.name}>{recursiveRender(item)}</div>
                recursiveRender(item),
            )}
        </div>
    );
    //  return <div className="wrapper">{props.data.map((item: LevelProps) => <OneLevel item={item} depth={}></OneLevel>)}</div>;
};
