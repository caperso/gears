import React, { useState } from 'react';
import './level.less';

export type BaseLevelProps = {
  name: string;
  staticUrl?: string;
  deep?: BaseLevelProps[];
  action?: <T>(route: string) => T;
};

export type Level = BaseLevelProps;

interface Props {
  data: Level[];
  baseFontSize?: number;
  fontSizeDecrease?: number;
}

export const Levels = (props: Props) => {
  const { data, baseFontSize = 45, fontSizeDecrease = 3 } = props;
  const [activeRoute, setActiveRoute] = useState('');

  const activeLevel = (item: Level, route: string) => {
    console.log(route);

    setActiveRoute(route);
    item.staticUrl ? window.open(item.staticUrl) : void 0;
    item.action ? item.action(route) : void 0;
  };

  /**
   * 递归渲染层级菜单
   * @param {Level} item
   * @param {number} [depth=0]
   * @param {string} [route]
   * @returns {React.ReactNode}
   */
  const recursiveRender = (item: Level, depth: number = 0, route: string = ''): React.ReactNode => {
    const currentRoute = route ? `${route}/${item.name}` : `${item.name}`;
    const fontSize = baseFontSize - fontSizeDecrease * depth > 12 ? baseFontSize - fontSizeDecrease * depth : 12;

    return (
      <div key={item.name}>
        <div
          key={item.name}
          className="g-levels-one"
          onClick={() => activeLevel(item, currentRoute)}
          style={{ fontSize, color: `${activeRoute === currentRoute ? '#2dc6ad' : ''}` }}
        >
          <span style={{ paddingLeft: `${depth}em` }}></span>
          {item.name}
        </div>
        {item.deep && item.deep.map((deepItem: Level) => recursiveRender(deepItem, depth + 1, currentRoute))}
      </div>
    );
  };

  const LevelContext = React.createContext({ activeRoute: '' });

  return (
    <LevelContext.Provider value={{ activeRoute: '' }}>
      <div className="g-levels-wrapper">{data.map((item: Level) => recursiveRender(item))}</div>
    </LevelContext.Provider>
  );
};
