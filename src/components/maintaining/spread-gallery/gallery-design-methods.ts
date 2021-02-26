/* default area = 4 , it can be customized */

import { AxisPointString } from '@/typings/types';
import { FixedUnit, GalleryUnit } from './types';

// prettier-ignore
let areaLimitMap = new Map([
    [0 , [[0,50],[0,50]]],
    [1 , [[50,100],[0,50]]],
    [2 , [[0,50],[50,100]]],
    [3 , [[50,100],[50,100]]]
  ])

/* designs */
/* */

/* annular spread design
 * when length is less than 4+1
 * when length is more than 4+1
 */
export function annularSpread(units: GalleryUnit[], centralized: boolean = true): FixedUnit[] {
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
export function randomSpread(queue: GalleryUnit[], centralized: boolean): FixedUnit[] {
  const newQueue: FixedUnit[] = queue.map((item, i) => {
    const position = i === 0 && centralized ? { x: `50%`, y: `50%` } : randomCalculate(i);
    return { ...item, ...position };
  });
  return newQueue;
}

const randomCalculate = (i: number): AxisPointString => {
  let limit = areaLimitMap.get(i % 4);

  if (!limit) {
    throw new Error(`unknown-limit:${limit}`);
  }

  return {
    x: `${Math.random() * (limit[0][1] - limit[0][0]) + limit[0][0]}%`,
    y: `${Math.random() * (limit[1][1] - limit[1][0]) + limit[1][0]}%`,
  };
};
