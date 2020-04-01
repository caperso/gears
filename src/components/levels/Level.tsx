import React from 'react';
import { RenderLevel } from './Levels';

export const Level = (props: {
  item: RenderLevel;
  depth: number;
  route: string;
  activeRoute: string;
  onChangeRoute: (route: string) => any;
  setActiveRoute: (param?: any) => any;
  setCompiledData: (param?: any) => any;
}) => {
  const { item, depth = 0, route = '', activeRoute = '', onChangeRoute, setActiveRoute, setCompiledData } = props;
  const currentRoute = route ? `${route}/${item.route}` : `${item.route}`;
  const fontSize = 45 - 7 * depth > 12 ? 45 - 7 * depth : 12;

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

  return (
    /*if no actual route, use name instead */
    <div key={item.name}>
      <div
        key={item.name}
        className="g-levels-one"
        data-hover={item.description}
        onClick={() => handleClickLevel(item, currentRoute)}
        style={{ fontSize, color: `${activeRoute === currentRoute ? '#2dc6ad' : ''}` }}
      >
        <span style={{ paddingLeft: `${depth + 1}em` }}></span>
        {item.name}
      </div>
      {item.deep &&
        item.extended &&
        item.deep.map((deepItem: RenderLevel) => (
          <Level
            item={deepItem}
            depth={depth + 1}
            route={currentRoute}
            activeRoute={activeRoute}
            onChangeRoute={onChangeRoute}
            setActiveRoute={setActiveRoute}
            setCompiledData={setCompiledData}
          />
        ))}
    </div>
  );
};
