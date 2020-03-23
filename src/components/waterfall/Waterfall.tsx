import React, { CSSProperties, useEffect, useState } from 'react';
import './Waterfall.less';

interface Props {
  children: React.ReactElement[];
  column?: number;
}

// const defaultGrid = {
//     horizontalEvenly: true,
// };

export const Waterfall = (props: Props) => {
  const { children, column = 3 } = props;

  const generateColumn = (
    column: number,
  ): CSSProperties['gridTemplateColumns'] => {
    let totalPropString = '';
    for (let i = 0; i < column; i++) {
      totalPropString.concat(' 1fr');
    }
    return totalPropString;
  };

  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const gridColumn = { gridTemplateColumns: generateColumn(column) };
    setStyle(gridColumn);
    console.log(gridColumn);
  }, [column]);

  return (
    <div className="g-waterfall-wrapper" style={style}>
      {children}
    </div>
  );
};
