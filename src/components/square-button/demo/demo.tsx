import React from 'react';
import { SquareButton } from '../SquareButton';
import './demo.less';

const icon = 'https://www.easyicon.net/api/resizeApi.php?id=1180534&size=72';

const SquareButtonDemo = () => {
  const data = [
    { name: '维护系统入口', icon },
    { name: '签到系统入口', icon },
    { name: '排查系统入口', icon },
    { name: '登记系统入口', icon },
    { name: '销毁系统入口', icon },
  ];

  return (
    <div className="g-demo-wrapper">
      {data.map(item => (
        <SquareButton key={item.name} {...item} />
      ))}
    </div>
  );
};

export default () => <SquareButtonDemo />;
