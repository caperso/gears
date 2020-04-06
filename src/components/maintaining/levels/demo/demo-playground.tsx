/**
 * title: 层级导航（Levels）
 * desc: testing&Playground
 */

import React, { useState } from 'react';
import { default as CodePaper, default as Levels } from '../index';
import { Level } from '../Levels';

const levels: Level[] = [
  {
    name: 'Work Hard',
    deep: [
      {
        name: 'Play Hard',
        deep: [
          {
            name: 'Work Hard',
            deep: [
              {
                name: 'Play Hard',
                route: '0',
              },
              {
                name: 'Work it out',
                route: '2',
              },
            ],
          },
        ],
      },
      {
        name: 'Work it out',
        route: '2',
      },
    ],
  },

  { name: 'Way Back', route: 'Way Back', description: 'Can we find our way back' },
  {
    name: 'Ride Or Die',
    description: 'Gonna live this way',
    deep: [
      {
        name: 'Game',
        description: '#BringBackTheGroove',
      },
    ],
  },
  {
    name: 'Larepac',
    staticUrl: 'https://caperal.cn',
    description: 'To site: https://caperal.cn',
  },
];
const LevelsDemo = () => {
  const [levelData, setLevelData] = useState(levels);

  const handleChange = (text: string) => {
    try {
      setLevelData(JSON.parse(text));
    } catch {
      console.error('error: INVALID JSON ARRAY FORMAT');
    }
  };

  const [currentRoute, setCurrentRoute] = useState('');

  return (
    <div className="demo-levels-wrapper">
      当前数据:
      <CodePaper text={`${JSON.stringify(levels)}`} handleClick={handleChange} />
      <br />
      当前路径: <span>{currentRoute}</span>
      <br />
      <Levels data={levelData} defaultExpanded={false} onChangeRoute={setCurrentRoute}></Levels>
    </div>
  );
};

export default () => <LevelsDemo />;
