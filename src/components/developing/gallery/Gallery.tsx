import { AxisPoint, DefaultHTMLElementProps } from '@/typings/types';
import React, { useEffect, useState } from 'react';
import './index.less';

/* default area = 4 , it can be customized */
// prettier-ignore
let areaLimitMap = new Map([
  [0 , [[0,50],[0,50]]],
  [1 , [[50,100],[0,50]]],
  [2 , [[0,50],[50,100]]],
  [3 , [[50,100],[50,100]]]
])

/* annular spread design
 * when length is less than 4+1
 * when length is more than 4+1
 */
function annularSpread(units: GalleryUnit[], centralized: boolean = true): FixedUnit[] {
  const length = units.length;
  // if (length <= 5) {
  // } else {}
  const totalCount = Math.floor(length / 4);
  const step = 50 / (totalCount + 1);

  let fixedQuery = [];
  for (let i = 0; i < length; i++) {
    const unit = units[i];
    const position = i === 0 && centralized ? { x: `50%`, y: `50%` } : annularCalculate(i, step);
    fixedQuery.push({ ...unit, ...position });
  }
  return fixedQuery;
}

function annularCalculate(i: number, step: number): AxisPoint {
  if (i === 0) {
    return { x: `50%`, y: `50%` };
  }
  let remainder = i % 4;
  let count = Math.floor(i / 4) + 1;
  let limit = areaLimitMap.get(remainder);

  if (!limit) {
    throw new Error(`unknown-limit:${limit}`);
  }

  let relativeRange = step * count - Math.random() * step;
  let range = relativeRange > (step * count) / 1.5 ? relativeRange : relativeRange + (step * count) / 1.5;
  let deltaX = (limit[0][0] === 50 ? +1 : -1) * range;
  let deltaY = (limit[1][0] === 50 ? +1 : -1) * range;
  let x = `${50 - deltaX}%`;
  let y = `${50 - deltaY}%`;

  return { x, y };
}

/* random spread design
 * all are random, but in 4 areas
 * get top limit range: Math.random() * (limit[0][1] - limit[0][0])
 * meet up least range: + limit[0][0]
 */
const randomSpread = (query: GalleryUnit[], centralized: boolean): FixedUnit[] => {
  const newQuery: FixedUnit[] = query.map((item, i) => {
    const position = i === 0 && centralized ? { x: `50%`, y: `50%` } : randomAreaInLimit(i);
    return { ...item, ...position };
  });
  return newQuery;
};
const randomAreaInLimit = (i: number): AxisPoint => {
  let limit = areaLimitMap.get(i % 4);

  if (!limit) {
    throw new Error(`unknown-limit:${limit}`);
  }

  return {
    x: `${Math.random() * (limit[0][1] - limit[0][0]) + limit[0][0]}%`,
    y: `${Math.random() * (limit[1][1] - limit[1][0]) + limit[1][0]}%`,
  };
};

export interface GalleryUnit {
  name: string;
  url: string;
  description: string;
}

export type FixedUnit = GalleryUnit & AxisPoint;
export type GalleryMode = 'random' | 'annular';

interface GalleryProps extends DefaultHTMLElementProps {
  units: GalleryUnit[];
  limit?: number;
  mode?: GalleryMode;
  defaultGray?: number;
  centralized?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({
  units = [],
  limit = 9,
  mode = 'annular',
  style = {},
  className = '',
  defaultGray = 0.9,
  centralized = true,
}) => {
  const [unitQuery, setUnitQuery] = useState<FixedUnit[]>([]);

  const sliceQuery = (query: GalleryUnit[], limit: number) => {
    let randomQuery = query.sort(() => Math.random() - Math.random());

    if (query.length > limit) {
      return randomQuery.slice(0, limit);
    }

    return randomQuery;
  };

  const fixQuery = (mode: GalleryProps['mode'], query: GalleryUnit[]): FixedUnit[] => {
    if (mode === 'random') {
      return randomSpread(query, centralized);
    }
    if (mode === 'annular') {
      return annularSpread(query, centralized);
    } else {
      return annularSpread(query, centralized);
    }
  };

  const getUnitStyle = (item: FixedUnit): React.CSSProperties => {
    return {
      left: item.x,
      top: item.y,
      backgroundImage: `url(${item.url})`,
    };
  };

  useEffect(() => {
    const query = sliceQuery(units, limit);
    const fixedUnits = fixQuery(mode, query);
    // reverse the query
    setUnitQuery(fixedUnits.reverse());
  }, [units.length, limit]);

  console.log(defaultGray);

  return (
    <dl className={`g-gallery-wrapper ${className}`} style={style}>
      {unitQuery.map(item => (
        <dd className="g-gallery-unit" style={getUnitStyle(item)} key={item.name}>
          <div className="g-gallery-description">{item.description}</div>
          <div className="g-gallery-name" style={{ filter: `grayscale(${defaultGray})` }}>
            {item.name}
          </div>
        </dd>
      ))}
    </dl>
  );
};

export default Gallery;
