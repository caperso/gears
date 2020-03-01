import React from 'react';
import { Levels } from './Levels';

interface LevelProps {
    name: string;
    url: string;
    static?: boolean;
    deep?: LevelProps;
}
const levels: LevelProps[] = [
    { name: 'Pipeline', url: 'pipeline' },
    { name: 'Ground', url: 'ground', deep: { name: 'Solid', url: 'solid', deep: { name: 'Dust', url: 'dust' } } },
    { name: 'Github', url: 'https://github.com/', static: true },
];

export const LevelsDemo = () => {
    // const location = useLocation();
    // /**
    //  * find url whether at current or root or not
    //  * @param {string} param
    //  * @returns
    //  */
    // const findReg = (param: string) => {
    //     // eslint-disable-next-line no-useless-escape
    //     let reg = new RegExp(`^\/(${param})|(\/)$`, 'g');
    //     return location.pathname.match(reg);
    // };

    return <Levels data={levels}></Levels>;
};
