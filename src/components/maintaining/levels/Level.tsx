import { DefaultHTMLElementProps } from '@/typings/types';
import React from 'react';
import { RenderLevel } from './Levels';

interface LevelProps extends DefaultHTMLElementProps {
  item: RenderLevel;
  depth: number;
  route: string;
  indent: number;
  style: React.CSSProperties;
  activeRoute: string;
  activeStyle: React.CSSProperties;
  onChangeRoute: (route: string) => any;
  setActiveRoute: (param?: any) => any;
  setCompiledData: (param?: any) => any;
}

export const Level: React.FC<LevelProps> = ({
  item,
  depth,
  route,
  style,
  indent,
  activeRoute,
  activeStyle,
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

  const fontSize: number = typeof style.fontSize === 'number' ? (style.fontSize as number) : 45;
  const actualFontSize = fontSize - 5 * depth > 24 ? fontSize - 5 * depth : 24;
  const paddingLeft = `${indent * depth}px`;
  const activeColor = activeStyle['color'] || '#0fe';

  const finalStyle: React.CSSProperties = {
    ...style,
    paddingLeft,
    fontSize: actualFontSize,
    color: `${item.staticUrl ? '' : activeRoute === currentRoute ? activeColor : ''}`,
  };

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
            indent={indent}
            depth={depth + 1}
            route={currentRoute}
            style={finalStyle}
            activeStyle={activeStyle}
            activeRoute={activeRoute}
            onChangeRoute={onChangeRoute}
            setActiveRoute={setActiveRoute}
            setCompiledData={setCompiledData}
          />
        ))}
    </div>
  );
};
