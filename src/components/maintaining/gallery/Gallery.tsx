import { AxisPointString, DefaultHTMLElementProps } from '@/typings/types';
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

  let fixedQueue = [];
  for (let i = 0; i < length; i++) {
    const unit = units[i];
    const position = i === 0 && centralized ? { x: `50%`, y: `50%` } : annularCalculate(i, step);
    fixedQueue.push({ ...unit, ...position });
  }
  return fixedQueue;
}

function annularCalculate(i: number, step: number): AxisPointString {
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
const randomSpread = (queue: GalleryUnit[], centralized: boolean): FixedUnit[] => {
  const newQueue: FixedUnit[] = queue.map((item, i) => {
    const position = i === 0 && centralized ? { x: `50%`, y: `50%` } : randomAreaInLimit(i);
    return { ...item, ...position };
  });
  return newQueue;
};
const randomAreaInLimit = (i: number): AxisPointString => {
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

export type FixedUnit = GalleryUnit & AxisPointString;
export type GalleryMode = 'random' | 'annular';

interface GalleryProps extends DefaultHTMLElementProps {
  units: GalleryUnit[];
  limit?: number;
  mode?: GalleryMode;
  defaultGray?: number;
  centralized?: boolean;
  onClick?: (unit: GalleryUnit) => any;
}

const Gallery: React.FC<GalleryProps> = ({
  units = [],
  limit = 9,
  mode = 'annular',
  style = {},
  className = '',
  defaultGray = 0.9,
  centralized = true,
  onClick = null,
}) => {
  const [unitQueue, setUnitQueue] = useState<FixedUnit[]>([]);

  const sliceQueue = (queue: GalleryUnit[], limit: number) => {
    let randomQueue = queue.sort(() => Math.random() - Math.random());

    if (queue.length > limit) {
      return randomQueue.slice(0, limit);
    }

    return randomQueue;
  };

  const fixQueue = (mode: GalleryProps['mode'], queue: GalleryUnit[]): FixedUnit[] => {
    if (mode === 'random') {
      return randomSpread(queue, centralized);
    }
    if (mode === 'annular') {
      return annularSpread(queue, centralized);
    } else {
      return annularSpread(queue, centralized);
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
    const queue = sliceQueue(units, limit);
    const fixedUnits = fixQueue(mode, queue);
    // reverse the queue
    setUnitQueue(fixedUnits.reverse());
  }, [units.length, limit]);

  console.log(defaultGray);

  return (
    <dl className={`g-gallery-wrapper ${className}`} style={style}>
      {unitQueue.map(item => (
        <dd className="g-gallery-unit" style={getUnitStyle(item)} key={item.url} onClick={() => (onClick ? onClick(item) : void 0)}>
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
