/**
 * title: 层级导航（Levels）
 */

import React, { useState } from 'react';
import { default as CodePaper, default as Levels } from '../index';
import { Level } from '../Levels';

const levels: Level[] = [
  {
    name: 'Astronomia',
    route: 'Astronomia',
    deep: [
      {
        name: 'DeepSpace',
        route: 'DeepSpace',
        deep: [
          { name: 'Dust', route: 'Dust' },
          { name: 'Void', route: 'Void' },
        ],
      },
      {
        name: 'Red Liquid',
        route: 'Red Liquid',
        deep: [
          { name: 'Oxygen', route: 'Oxygen' },
          { name: 'Heat', route: 'Heat' },
        ],
      },
    ],
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
  return (
    <div className="demo-levels-wrapper">
      当前数据:
      <CodePaper text={`${JSON.stringify(levels)}`} handleClick={handleChange} />
      <Levels data={levelData} defaultExpanded={false}></Levels>
    </div>
  );
};

export default () => <LevelsDemo />;
