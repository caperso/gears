/**
 * title: 层级导航（Levels）
 */

import { CodePaper } from '@/components/code-paper/CodePaper';
import React, { useState } from 'react';
import { Level, Levels } from '../Levels';

const levels: Level[] = [
  {
    name: 'Astronomia',
    deep: [
      {
        name: 'DeepSpace',
        deep: [{ name: 'Dust' }, { name: 'Void' }],
      },
      {
        name: 'Red Liquid',
        deep: [{ name: 'Oxygen' }, { name: 'Heat' }],
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
      <Levels data={levelData} allExpanded={false}></Levels>
    </div>
  );
};

export default () => <LevelsDemo />;
