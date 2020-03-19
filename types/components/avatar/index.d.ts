import React, { CSSProperties, ReactNode } from 'react';
interface AvatarProps {
    shape: 'circle' | 'square';
    size: 'default' | 'small' | 'large' | number;
    prefixCls?: string;
    src?: string;
    srcSet?: string;
    icon?: ReactNode;
    className?: string;
    children?: React.ReactNode;
    style?: CSSProperties;
    alt?: string;
    onError?: () => boolean;
}
interface AvatarState {
    scale: number;
    mounted: boolean;
    isImgExist: boolean;
}
export default class Avatar extends React.Component<AvatarProps, AvatarState> {
    static defaultProps: {
        shape: "circle" | "square";
        size: number | "small" | "default" | "large";
    };
    state: {
        scale: number;
        mounted: boolean;
        isImgExist: boolean;
    };
    private avatarNode;
    private avatarChildren;
    private lastChildrenWidth;
    private lastNodeWith;
    componentDidMount(): void;
    componentDidUpdate(prevProps: AvatarProps): void;
    setScale(): void;
    handleImgLoadError: () => void;
    renderAvatar: ({ getPrefixCls }: any) => JSX.Element;
    render(): JSX.Element;
}
export {};
