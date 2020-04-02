import { DefaultHTMLElementProps } from '@/typings/types';
import React, { useEffect, useState } from 'react';
import './index.less';
import { Level } from './Level';

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

export interface RenderLevel extends Level {
  deep?: RenderLevel[];
  /* extends deeper level by default */
  extended: boolean | null;
}

interface LevelsProps extends DefaultHTMLElementProps {
  /* data receives array of Level */
  data: Level[];
  /* all deep levels expended when loaded */
  defaultExpanded?: boolean;
  /* indent of every deep level */
  indent?: number;
  /* single level style */
  singleStyle?: React.CSSProperties;
  /* single level active style */
  singleActiveStyle?: React.CSSProperties;
  /* fn with parameter of current actual route */
  onChangeRoute?: (route: string) => any;
}

const Levels: React.FC<LevelsProps> = ({
  data = [],
  style = {},
  indent = 20,
  className = '',
  singleStyle = {},
  singleActiveStyle = {},
  defaultExpanded = false,
  onChangeRoute = () => {},
}) => {
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

  return (
    <div className={`${className} g-levels-wrapper`} style={style}>
      {compiledData.map((item, index) => (
        <Level
          key={index}
          item={item}
          route=""
          depth={0}
          indent={indent}
          style={singleStyle}
          activeStyle={singleActiveStyle}
          activeRoute={activeRoute}
          onChangeRoute={onChangeRoute}
          setActiveRoute={setActiveRoute}
          setCompiledData={setCompiledData}
        />
      ))}
    </div>
  );
};

export default Levels;
