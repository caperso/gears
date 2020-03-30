/**
 * title: 层级导航（Levels）
 */

import { CodePaper } from '@/components/code-paper/CodePaper';
import React, { useState } from 'react';
import { Level, Levels } from '../Levels';

const levels: Level[] = [
  { name: 'Pipeline' },
  { name: 'Github', staticUrl: 'https://github.com/' },
  {
    name: 'Ground',
    deep: [
      {
        name: 'Solid',
        deep: [{ name: 'Dust' }, { name: 'Germ' }],
      },
      { name: 'Liquid' },
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
      <Levels data={levelData}></Levels>
    </div>
  );
};

export default () => <LevelsDemo />;
