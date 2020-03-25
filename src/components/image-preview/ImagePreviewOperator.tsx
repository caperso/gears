import { MenuItem } from '@/typings/types';
import React from 'react';
import { ImageOperationMap, OperatorProps } from './ImagePreview';
import './ImagePreview.less';

interface Props {
    operations: ImageOperationMap;
    bar: OperatorProps['bar'];
}

const ImagePreviewOperator = (props: Props) => {
    const { operations, bar = null } = props;

    const renderBar = (bar: OperatorProps['bar']): React.ReactElement | null => {
        if (!bar) {
            return null;
        }

        if (bar instanceof Array) {
            let barOperations: MenuItem[] = [];
            for (let name of bar) {
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

        return bar;
    };

    return renderBar(bar);
};

export default ImagePreviewOperator;
