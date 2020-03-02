import React, { useState } from 'react';
import './index.scss';

export interface LevelProps {
    name: string;
    url: string;
    static?: boolean;
    deep?: LevelProps;
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

    /**
     * 递归渲染层级菜单
     * @param {LevelProps} item
     * @param {number} [depth=0]
     * @returns {React.ReactNode}
     */
    const recursiveRender = (item: LevelProps, depth: number = 0): React.ReactNode => {
        const classNameGenerator = (depth: number) => {
            return `g-levels-link `;
        };
        console.log(item.name);

        const oneLevel = (depth: number) => (
            <div
                className={classNameGenerator(depth)}
                onClick={() => activeLevel(item)}
                style={active ? { color: '#2dc6ad' } : undefined}
            >
                <span style={{ paddingLeft: `${depth}em` }}></span>
                {item.name}
            </div>
        );
        if (item.deep) {
            return (
                <>
                    {oneLevel(depth)}
                    {recursiveRender(item.deep, depth + 1)}
                </>
            );
        }
        return oneLevel(depth);
    };
    return (
        <div className="g-levels-wrapper">
            {props.data.map((item: LevelProps) => (
                <div key={item.name}>{recursiveRender(item)}</div>
            ))}
        </div>
    );
    //  return <div className="wrapper">{props.data.map((item: LevelProps) => <OneLevel item={item} depth={}></OneLevel>)}</div>;
};
