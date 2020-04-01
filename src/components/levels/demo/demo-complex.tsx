/**
 * title: 层级导航（Levels）
 */

import CodePaper from '@/components/code-paper';
import { message } from 'antd';
import React, { useState } from 'react';
import Levels from '../index';
import { Level } from '../Levels';

function showText() {
  message.success('THIS ACTION WAS LIFT OFF');
}

function getCurrentActiveRoute(route: string) {
  message.info(`Current route: ${route}`);
}

const levels: Level[] = [
  {
    name: 'The Otherside',
    route: 'otherside',
    description: 'The Great Sky Upon Us',
    deep: [
      {
        name: 'Larepac',
        staticUrl: 'https://caperal.cn',
        description: 'To site: https://caperal.cn',
      },
      {
        name: 'Phoenix',
        route: 'phoenix',
        description: '#BringBackTheGroove',
        deep: [
          {
            name: 'Oxygen',
            route: 'xxxgen',
            description: 'THE LIVE ORIGINS',
            action: showText,
          },
          {
            name: 'Green Eyes',
            description: 'Go out like dynamite',
            action: showText,
          },
        ],
      },
    ],
  },
  { name: 'Way Back', route: 'Way Back', description: 'Can we find our way back' },
  { name: 'Ride Or Die', route: 'Ride Or Die', description: 'Gonna live this way' },
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
      <Levels data={levelData} defaultExpanded={false} getCurrentActiveRoute={setCurrentRoute}></Levels>
    </div>
  );
};

export default () => <LevelsDemo />;
