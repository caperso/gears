/**
 * title: 层级导航（Levels）
 */

import { CodePaper } from '@/components/code-paper/CodePaper';
import React, { useState } from 'react';
import { Level, Levels } from '../Levels';

const levels: Level[] = [
  {
    name: 'Astronomia',
    description: 'The Great Sky Upon Us',
    deep: [
      {
        name: 'DeepSpace',
        description: 'Light That Never Comes',
        deep: [{ name: 'Dust' }, { name: 'Germ' }],
      },
      {
        name: 'Red Liquid',
        description: 'Filthy Prize Paradise',
        deep: [
          { name: 'Oxygen', description: 'THE LIVE ORIGINS' },
          { name: 'Hear', description: 'Every color bleeds into the same' },
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
      <Levels data={levelData} allExpanded={false}></Levels>
    </div>
  );
};

export default () => <LevelsDemo />;
