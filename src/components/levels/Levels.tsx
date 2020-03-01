import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './index.scss';


interface LevelProps {
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
    const history = useHistory();

    const changeRoute = (url: string) => {
        if (active) {
            //TODO: change to sallower level url
            history.push('/');
        } else {
            history.push(url);
        }
        setActive(s => !s);
    };

    const replaceRoute = (url: string) => window.location.replace(url);
    /**
     * find url whether at current or root or not
     * @param {string} param
     * @returns
     */
    const findReg = (param: string) => {
        // eslint-disable-next-line no-useless-escape
        let reg = new RegExp(`^\/(${param})|(\/)$`, 'g');
        return window.location.pathname.match(reg);
    };

    return (
        <div className="wrapper">
            {props.data.map((item: LevelProps) => (
                <div
                    key={item.name}
                    className="link"
                    onClick={item.static ? () => replaceRoute(item.url) : () => changeRoute(item.url)}
                    style={active ? { color: '#2dc6ad' } : undefined}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};
