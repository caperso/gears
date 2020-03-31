/**
 * title: 层级导航（Levels）
 */

import { CodePaper } from '@/components/code-paper/CodePaper';
import { message } from 'antd';
import React, { useState } from 'react';
import { Level, Levels } from '../Levels';

function showText() {
  message.success('THIS ACTION WAS LIFT OFF');
}

const levels: Level[] = [
  {
    name: 'The Otherside',
    description: 'The Great Sky Upon Us',
    deep: [
      {
        name: 'Larepac',
        staticUrl: 'https://caperal.cn',
        description: 'To site: https://caperal.cn',
      },
      {
        name: 'Phoenix',
        description: '#BringBackTheGroove',
        deep: [
          { name: 'Oxygen', description: 'THE LIVE ORIGINS', action: showText },
          { name: 'Green Eyes', description: 'Go out like dynamite', action: showText },
        ],
      },
    ],
  },
  { name: 'Way Back', description: 'Can we find our way back' },
  { name: 'Ride Or Die', description: 'Gonna live this way' },
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
