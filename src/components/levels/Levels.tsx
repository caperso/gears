import React, { useEffect, useState } from 'react';
import './index.less';

interface Props {
  /* data receives array of Level */
  data: Level[];
  /* all deep levels expended when loaded */
  defaultExpanded?: boolean;
  baseFontSize?: number; // TODO:move to style
  fontSizeDecrease?: number; // TODO:move to style
  /* fn with parameter of current actual route */
  getCurrentActiveRoute?: (route: string) => any;
}

export type Level = {
  /* name */
  name: string;
  /* the actual route name of this level item */
  route?: string;
  /* next deeper level, same structure */
  deep?: Level[];
  /* whole url, it will open new tab and go */
  staticUrl?: string;
  /* this level item description, appear as pseudo */
  description?: string;
  /* fn return with a parameter of actual route */
  action?: (route: string) => any;
};

interface RenderLevel extends Level {
  deep?: RenderLevel[];
  /* extends deeper level by default */
  extended: boolean | null;
}

const Levels = (props: Props) => {
  const { data, baseFontSize = 45, defaultExpanded = false, fontSizeDecrease = 3, getCurrentActiveRoute = null } = props;

  const [compiledData, setCompiledData] = useState<RenderLevel[]>([]);

  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    /**
     * assign extend state to every level, make no side effect
     * @param {Level[]} data
     * @param {boolean} defaultExpanded
     * @returns {RenderLevel[]}
     */
    function recursiveAssign(data: Level[], defaultExpanded: boolean): RenderLevel[] {
      const routes = data.map(item => {
        // make sure no route include '/' so route wont failed
        if (item.route && item.route.match('/')) {
          throw new Error('Please make sure no "/" in level\'s route');
        } else if (item.name.match('/')) {
          throw new Error('Please make sure no "/" in level\'s name');
        }
        return item.route || item.name;
      });

      // make sure no route duplicate at this level
      routes.map((route, i) => {
        for (let j = i + 1; j < routes.length; j++) {
          if (!route) {
            throw new Error('Please check no empty name');
          }
          if (route === routes[j]) {
            throw new Error('Please make every route(or name) unique');
          }
        }
      });

      return data.map(item => {
        let result: RenderLevel;
        let deep: RenderLevel['deep'];
        if (item.deep) {
          deep = recursiveAssign(item.deep, defaultExpanded);
        }

        if (defaultExpanded && item.deep) {
          result = Object.assign(item, { extended: true, deep });
        } else if (!defaultExpanded && item.deep) {
          result = Object.assign(item, { extended: false, deep });
        } else {
          result = Object.assign(item, { extended: null, deep });
        }
        return result;
      });
    }

    let compiledData = recursiveAssign(data, defaultExpanded);
    setCompiledData(compiledData);
  }, [data]);

  const handleClickLevel = (item: RenderLevel, route: string) => {
    /**
     * change Level extended state
     * @param {RenderLevel[]} looper
     * @param {string[]} routes
     * @param {number} routeIndex
     * @returns
     */
    function changeLevelsExtended(looper: RenderLevel[], routes: string[], routeIndex: number, isLastRoute: boolean) {
      let isTheRouteEnd = routeIndex + 1 >= routes.length;
      let matchedIndex;
      for (let j = 0; j < looper.length; j++) {
        const ele = looper[j];
        if (ele.route === routes[routeIndex]) {
          ele.extended = isTheRouteEnd ? !ele.extended : true; // if is the loop's end, re-click will fold it
          matchedIndex = j;
        } else {
          ele.extended = false;
        }
      }

      if (matchedIndex === undefined) {
        return console.warn(`no matched index!`);
      }

      if (isTheRouteEnd) {
        return;
      }

      const nextLooper = looper[matchedIndex].deep;
      if (nextLooper === undefined) {
        return console.warn(`levels: loop chain broken!`);
      }

      changeLevelsExtended(nextLooper, routes, routeIndex + 1, isLastRoute);
    }

    function getUpdateLevels(levels: RenderLevel[]): RenderLevel[] {
      const routes = route.split('/');
      const isLastRoute = route === activeRoute;
      changeLevelsExtended(levels, routes, 0, isLastRoute);
      return levels;
    }

    item.extended !== null && setCompiledData(s => getUpdateLevels([...s]));
    item.staticUrl && window.open(item.staticUrl);
    item.action && item.action(route);
    setActiveRoute(route);
    getCurrentActiveRoute && getCurrentActiveRoute(route);
    console.log('%croute:', 'color:#0fe;', route);
  };

  /**
   * Render levels recursively
   * @param {RenderLevel} item
   * @param {number} [depth=0]
   * @param {string} [route]
   * @returns {React.ReactNode}
   */
  const recursiveRender = (item: RenderLevel, depth: number = 0, route: string = ''): React.ReactNode => {
    /*if no actual route, use name instead */
    const currentRoute = route ? `${route}/${item.route}` : `${item.route}`;
    const fontSize = baseFontSize - fontSizeDecrease * depth > 12 ? baseFontSize - fontSizeDecrease * depth : 12;
    return (
      <div key={item.name}>
        <div
          key={item.name}
          className="g-levels-one"
          data-hover={item.description}
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

  return <div className="g-levels-wrapper">{compiledData.map(item => recursiveRender(item))}</div>;
};

export default Levels;
