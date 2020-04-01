import { DefaultHTMLElementProps } from '@/typings/types';
import React from 'react';
import { RenderLevel } from './Levels';

export interface Level {
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
  action?: (route: string, activeState: boolean) => any;
}

interface LevelProps extends DefaultHTMLElementProps {
  item: RenderLevel;
  depth: number;
  route: string;
  style: React.CSSProperties;
  activeRoute: string;
  onChangeRoute: (route: string) => any;
  setActiveRoute: (param?: any) => any;
  setCompiledData: (param?: any) => any;
}

export const Level: React.FC<LevelProps> = ({
  item,
  depth,
  route = '',
  style,
  activeRoute = '',
  onChangeRoute,
  setActiveRoute,
  setCompiledData,
}) => {
  const currentRoute = route ? `${route}/${item.route}` : `${item.route}`;

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

    item.extended !== null && setCompiledData((s: RenderLevel[]) => getUpdateLevels([...s]));
    item.staticUrl && window.open(item.staticUrl);
    item.action && item.action(route, route === activeRoute);
    setActiveRoute(route);
    onChangeRoute && onChangeRoute(route);
    console.log('%croute:', 'color:#0fe;', route);
  };

  console.log(style);

  const fontSize = 45 - 5 * depth > 24 ? 45 - 5 * depth : 24;
  const finalStyle: React.CSSProperties = {
    fontSize,
    paddingLeft: `${2 * depth}rem`,
    color: `${activeRoute === currentRoute ? '#0fe' : ''}`,
    ...style,
  };

  console.log(finalStyle, depth);

  return (
    /*if no actual route, use name instead */
    <div>
      <div
        style={finalStyle}
        key={item.name}
        className="g-levels-one"
        data-hover={item.description}
        onClick={() => handleClickLevel(item, currentRoute)}
      >
        {item.name}
      </div>
      {item.deep &&
        item.extended &&
        item.deep.map((deepItem: RenderLevel, index) => (
          <Level
            key={index}
            item={deepItem}
            depth={depth + 1}
            route={currentRoute}
            style={finalStyle}
            activeRoute={activeRoute}
            onChangeRoute={onChangeRoute}
            setActiveRoute={setActiveRoute}
            setCompiledData={setCompiledData}
          />
        ))}
    </div>
  );
};
