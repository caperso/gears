import React from 'react';
import { ImageOperationMap, OperatorBarProps } from './ImagePreview';
import './ImagePreview.less';
interface Props {
  operations: ImageOperationMap;
  toolbar: OperatorBarProps;
}
declare const ImagePreviewOperator: (
  props: Props,
) => React.ReactElement<
  any,
  | string
  | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null)
  | (new (props: any) => React.Component<any, any, any>)
> | null;
export default ImagePreviewOperator;
