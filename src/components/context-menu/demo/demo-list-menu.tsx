import { message } from 'antd';
import React from 'react';
import ContextMenu from '../ContextMenu';
import './demo.less';

const BasicContextMenuSample = () => {
  const greetMessage = () => message.info('Greetings traveler~');

  const getTime = () => message.info(`${new Date().getHours()}:${new Date().getMinutes()}`);

  const reportIssue = () => {
    message.info('reporting your issue');

    let fakeHandler = new Promise((resolve, reject) => {
      setTimeout(() => {
        let flag = Math.random();
        if (flag > 0.4) {
          resolve('success');
        } else {
          reject('fail');
        }
      }, 1500);
    });

    fakeHandler.then(() => message.success('thanks for your report')).catch(() => message.error('report failed, please try again later'));
  };

  const menuList = [
    { name: 'Say hi', method: greetMessage },
    { name: 'Tell me when', method: getTime },
    { name: 'Report an issue', method: reportIssue },
  ];

  return (
    <>
      <ContextMenu menu={menuList}>
        <div className="test-block bgc-brown" data-name="list context menu">
          List context menu
        </div>
      </ContextMenu>
    </>
  );
};

export default () => <BasicContextMenuSample />;
