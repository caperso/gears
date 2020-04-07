import { DefaultHTMLElementProps } from '@/typings/types';
import React, { useEffect, useState } from 'react';
import './index.less';

// prettier-ignore
let limitMap = new Map([
  [0 , [[0,50],[0,50]]],
  [1 , [[50,100],[0,50]]],
  [2 , [[0,50],[50,100]]],
  [3 , [[50,100],[50,100]]]
])

const randomAreaInLimit = (i: number) => {
  if (i === 0) {
    return { x: `50%`, y: `50%` };
  }
  let limit = limitMap.get(i % 4);

  if (!limit) {
    throw new Error(`unknown-limit:${limit}`);
  }

  /*
   * get top limit range: Math.random() * (limit[0][1] - limit[0][0])
   * meet up least range: + limit[0][0]
   */
  return {
    x: `${Math.random() * (limit[0][1] - limit[0][0]) + limit[0][0]}%`,
    y: `${Math.random() * (limit[1][1] - limit[1][0]) + limit[1][0]}%`,
  };
};

export interface BillboardUnit {
  name: string;
  url: string;
  description: string;
}

export interface FixedUnit extends BillboardUnit {
  x: string;
  y: string;
}

interface BillboardProps extends DefaultHTMLElementProps {
  units: BillboardUnit[];
  limit?: number;
}

const Billboard: React.FC<BillboardProps> = ({ units = [], limit = 9, style = {}, className = '' }) => {
  const [unitQuery, setUnitQuery] = useState<FixedUnit[]>([]);

  const verifyQuery = (query: BillboardUnit[], limit: number) => {
    let randomQuery = query.sort(() => Math.random() - Math.random());
    if (query.length > limit) {
      return randomQuery.slice(0, limit);
    }

    return randomQuery;
  };

  const fixQuery = (query: BillboardUnit[]): FixedUnit[] => {
    const newQuery: FixedUnit[] = query.map((item, i) => {
      let position = randomAreaInLimit(i);
      return { ...item, ...position };
    });
    return newQuery;
  };

  const getUnitStyle = (item: FixedUnit): React.CSSProperties => {
    return {
      left: item.x,
      top: item.y,
      backgroundImage: `url(${item.url})`,
    };
  };

  useEffect(() => {
    const query = verifyQuery(units, limit);
    const fixedUnits = fixQuery(query);

    setUnitQuery(fixedUnits);
  }, [units.length, limit]);

  return (
    <dl className={`g-billboard-wrapper ${className}`} style={style}>
      {unitQuery.map(item => (
        <dd className="g-billboard-unit" style={getUnitStyle(item)} key={item.name}>
          <div className="g-billboard-description">{item.description}</div>
          <div className="g-billboard-name">{item.name}</div>
        </dd>
      ))}
    </dl>
  );
};

export default Billboard;
