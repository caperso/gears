import React, { useEffect, useState } from 'react';
import './level.less';

export type Level = {
  name: string;
  staticUrl?: string;
  deep?: Level[];
  action?: <T>(route: string) => T;
};

interface RenderLevel extends Level {
  deep?: RenderLevel[];
  extended: boolean | null;
}

interface Props {
  data: Level[];
  baseFontSize?: number;
  fontSizeDecrease?: number;
  initExpanded: boolean; // false
}

export const Levels = (props: Props) => {
  const { data, baseFontSize = 45, initExpanded = false, fontSizeDecrease = 3 } = props;

  const [compiledData, setCompiledData] = useState<RenderLevel[]>([]);

  useEffect(() => {
    // make no side effect
    function recursiveAssign(data: Level[], initState: boolean): RenderLevel[] {
      return data.map(item => {
        // make sure no name include '/' so route wont failed
        if (item.name.match('/')) {
          throw new Error('Please make sure no "/" in level\'s name');
        }
        let result: RenderLevel;
        let deep: RenderLevel['deep'];
        if (item.deep) {
          deep = recursiveAssign(item.deep, initState);
        }
        if (initState && item.deep) {
          result = Object.assign(item, { extended: true, deep });
        }
        if (!initState && item.deep) {
          result = Object.assign(item, { extended: false, deep });
        }
        result = Object.assign(item, { extended: null, deep });
        return result;
      });
    }

    let compiledData = recursiveAssign(data, initExpanded);
    setCompiledData(compiledData);
  }, [data]);

  const [activeRoute, setActiveRoute] = useState('');

  const handleClickLevel = (item: RenderLevel, route: string) => {
    console.log(route);
    setActiveRoute(route);

    // item.extended !== null && setCompiledData(s=>{

    //   const routeArray = route.split('/')
    //   const recursiveFinder =()=>{
    //     let depth = 0
    //     for (let i = 0; i < s.length; i++) {
    //       if(s[i].name===routeArray[depth]);

    //     }
    //   }
    //   );

    // }

    item.staticUrl ? window.open(item.staticUrl) : void 0;
    item.action ? item.action(route) : void 0;
  };

  /**
   * 递归渲染层级菜单
   * @param {RenderLevel} item
   * @param {number} [depth=0]
   * @param {string} [route]
   * @returns {React.ReactNode}
   */
  const recursiveRender = (item: RenderLevel, depth: number = 0, route: string = ''): React.ReactNode => {
    const currentRoute = route ? `${route}/${item.name}` : `${item.name}`;
    const fontSize = baseFontSize - fontSizeDecrease * depth > 12 ? baseFontSize - fontSizeDecrease * depth : 12;

    return (
      <div key={item.name}>
        <div
          key={item.name}
          className="g-levels-one"
          onClick={() => handleClickLevel(item, currentRoute)}
          style={{ fontSize, color: `${activeRoute === currentRoute ? '#2dc6ad' : ''}` }}
        >
          <span style={{ paddingLeft: `${depth}em` }}></span>
          {item.name}
        </div>
        {item.deep && item.extended && item.deep.map((deepItem: RenderLevel) => recursiveRender(deepItem, depth + 1, currentRoute))}
      </div>
    );
  };

  const LevelContext = React.createContext({ activeRoute: '' });

  return (
    <LevelContext.Provider value={{ activeRoute: '' }}>
      <div className="g-levels-wrapper">{compiledData.map((item: RenderLevel) => recursiveRender(item))}</div>
    </LevelContext.Provider>
  );
};
