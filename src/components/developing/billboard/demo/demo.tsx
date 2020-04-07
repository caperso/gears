import { message } from 'antd';
import React from 'react';
import { BillboardUnit } from '../Billboard';
import Billboard from '../index';

const fakeUnits: BillboardUnit[] = [
  {
    name: '111111',
    url: 'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
    description: 'description',
  },
  {
    name: '22222',
    url: 'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
    description: 'description',
  },
  {
    name: '3333',
    url: 'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
    description: 'description',
  },
  {
    name: '444',
    url: 'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
    description: 'description',
  },
  {
    name: '55',
    url: 'https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png',
    description: 'description',
  },
];

const BillboardDemo = () => {
  const handleClick = (text: string) => {
    message.info(text);
  };
  return (
    <div>
      <Billboard units={fakeUnits} limit={3} />
    </div>
  );
};

export default () => <BillboardDemo />;
