import { CodePaper } from 'components/code-paper/CodePaper';
import React, { useState } from 'react';
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
    const [levelData, setLevelData] = useState(levels)

    const handleChange = (text:string)=>{
        try{
            setLevelData(JSON.parse(text))
        }catch{
            console.error('error: INVALID JSON ARRAY FORMAT');
        }
    }
    return (
        <div className="demo-levels-wrapper">
            当前数据:
            <CodePaper text={`${JSON.stringify(levels)}`} handleClick={handleChange} />
            <Levels data={levelData}></Levels>
        </div>
    );
};
