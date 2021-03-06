import { message } from 'antd';
import React from 'react';
import CodePaper from '../index';

const CodePaperDemo = () => {
  const handleClick = (text: string) => {
    message.info(text);
  };
  return (
    <div>
      <h3>代码块</h3>
      <CodePaper text="" handleClick={handleClick} />
    </div>
  );
};

export default () => <CodePaperDemo />;
