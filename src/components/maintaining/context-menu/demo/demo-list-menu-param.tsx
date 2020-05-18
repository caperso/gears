import { message } from 'antd';
import React from 'react';
import ContextMenu from '../index';
import './demo.less';

const people = [
  { id: 1, name: 'John', age: 32 },
  { id: 2, name: 'Far', age: 21 },
  { id: 3, name: 'Donald', age: 66 },
  { id: 4, name: 'Austin', age: 7 },
];

const BasicContextMenuSample = () => {
  const greetMessage = (name: string) => message.info(`Greeting ${name}~`);

  const getAge = (age: number) => message.info(`${age}`);

  const menuList = [
    { name: 'Say hi', method: greetMessage },
    { name: 'Tell me when', method: getAge },
  ];

  return (
    <>
      {people.map(person => {
        <ContextMenu menu={menuList} key={person.id}  rest={{ age: person.age, name: person.name }}>
          <div className="test-block bgc-brown" data-name="list context menu">
            List context menu
          </div>
        </ContextMenu>;
      })}
    </>
  );
};

export default () => <BasicContextMenuSample />;
