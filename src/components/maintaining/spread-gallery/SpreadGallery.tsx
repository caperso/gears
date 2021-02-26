import React, { useEffect, useState } from 'react';
import { annularSpread, randomSpread } from './gallery-design-methods';
import './index.less';
import { FixedUnit, GalleryProps, GalleryUnit } from './types';

const SpreadGallery: React.FC<GalleryProps> = ({
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

export default SpreadGallery;
