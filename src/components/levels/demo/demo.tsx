/**
 * title: 层级导航（Levels）
 */

import { CodePaper } from '@/components/code-paper/CodePaper';
import { message } from 'antd';
import React, { useState } from 'react';
import { Level, Levels } from '../Levels';

const levels: Level[] = [
  { name: 'Pipeline' },
  { name: 'Github', staticUrl: 'https://github.com/caperso' },
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

  const dangerousParse = (text: string) => {
    try {
      setLevelData(JSON.parse(text));
    } catch {
      console.error('error: INVALID JSON ARRAY FORMAT');
    }
  };

  const getRoute = (route: string) => message.success(`changed to ${route}`);

  return (
    <div className="demo-levels-wrapper">
      当前数据:
      <CodePaper text={`${JSON.stringify(levels)}`} handleClick={dangerousParse} />
      <Levels data={levelData} allExpanded={true} getCurrentActiveRoute={getRoute}></Levels>
    </div>
  );
};

export default () => <LevelsDemo />;
