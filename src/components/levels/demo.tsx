import { CodePaper } from 'components/code-paper/CodePaper';
import React, { useState } from 'react';
import { Level, Levels } from './Levels';

const levels: Level[] = [
    { name: 'Pipeline', url: 'pipeline' },
    { name: 'Github', url: 'https://github.com/', static: true },
    {
        name: 'Ground',
        url: 'ground',
        deep: [
            {
                name: 'Solid',
                url: 'solid',
                deep: [
                    { name: 'Dust', url: 'dust' },
                    { name: 'Germ', url: 'germ' },
                ],
            },
            { name: 'Liquid', url: 'liquid' },
        ],
    },
];

export const LevelsDemo = () => {
    const [levelData, setLevelData] = useState(levels);

    const handleChange = (text: string) => {
        try {
            setLevelData(JSON.parse(text));
        } catch {
            console.error('error: INVALID JSON ARRAY FORMAT');
        }
    };
    return (
        <div className="demo-levels-wrapper">
            当前数据:
            <CodePaper text={`${JSON.stringify(levels)}`} handleClick={handleChange} />
            <Levels data={levelData}></Levels>
        </div>
    );
};
