import { MenuItem } from '@/typings/types';
import React from 'react';
import { ImageOperationMap, OperatorBarProps } from './ImagePreview';
import './index.less';

interface Props {
  operations: ImageOperationMap;
  toolbar: OperatorBarProps;
}

const ImagePreviewOperator = (props: Props) => {
  const { operations, toolbar = null } = props;

  const renderBar = (toolbar: OperatorBarProps): React.ReactElement | null => {
    if (!toolbar) {
      return null;
    }

    if (toolbar instanceof Array) {
      let barOperations: MenuItem[] = [];
      for (let name of toolbar) {
        const method = operations[name];
        if (method) {
          const newItem: MenuItem = { name, method };
          barOperations = [...barOperations, newItem];
        } else {
          console.warn(`can't find method which refers ${name}`);
        }
      }

      const menu = (
        <>
          {barOperations.map(item => (
            <i key={item.name} onClick={item.method}>
              {item.name}
            </i>
          ))}
        </>
      );
      return menu;
    }

    return toolbar;
  };

  return renderBar(toolbar);
};

export default ImagePreviewOperator;
