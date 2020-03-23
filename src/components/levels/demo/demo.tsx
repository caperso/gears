import { CodePaper } from '@/components/code-paper/CodePaper';
import React, { useState } from 'react';
import { Level, Levels } from '../Levels';

const levels: Level[] = [
  { name: 'Pipeline', route: 'pipeline' },
  { name: 'Github', route: 'https://github.com/', static: true },
  {
    name: 'Ground',
    route: 'ground',
    deep: [
      {
        name: 'Solid',
        route: 'solid',
        deep: [
          { name: 'Dust', route: 'dust' },
          { name: 'Germ', route: 'germ' },
        ],
      },
      { name: 'Liquid', route: 'liquid' },
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
      <h3>组件名称：层级导航（Levels）</h3>
      <h4>(开发中)</h4>
      <h4>示例</h4>
      当前数据:
      <CodePaper
        text={`${JSON.stringify(levels)}`}
        handleClick={handleChange}
      />
      <Levels data={levelData}></Levels>
    </div>
  );
};
