import { DefaultHTMLElementProps } from '@/typings/types';
import React, { useEffect, useState } from 'react';
import './index.less';

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

const Billboard: React.FC<BillboardProps> = ({ units = [], limit = 9 }) => {
  const [unitQuery, setUnitQuery] = useState<FixedUnit[]>([]);

  const getUnitStyle = (item: FixedUnit): React.CSSProperties => ({
    left: item.x,
    top: item.y,
    backgroundImage: `url(${item.url})`,
  });

  const verifyQuery = (query: BillboardUnit[], limit: number) => {
    let randomQuery = query.sort(() => Math.random() - Math.random());
    if (query.length > limit) {
      return randomQuery.slice(0, limit);
    }
    return randomQuery;
  };

  const fixQuery = (query: BillboardUnit[]): FixedUnit[] => {
    const newQuery: FixedUnit[] = query.map(item => ({
      ...item,
      x: `${Math.random() * 60 + 10}%`,
      y: `${Math.random() * 60 + 10}%`,
    }));
    return newQuery;
  };

  useEffect(() => {
    const query = verifyQuery(units, limit);
    const fixedUnits = fixQuery(query);
    setUnitQuery(fixedUnits);
  }, [units.length, limit]);

  return (
    <dl className="g-billboard-wrapper">
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
