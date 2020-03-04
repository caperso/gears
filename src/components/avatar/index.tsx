// 本组建照搬ant design avatar, 做练习用
import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';

interface AvatarProps {
    shape: 'circle' | 'square';
    size: 'default' | 'small' | 'large' | number;
    prefixCls?: string;
    src?: string;
    srcSet?: string;
    icon?: ReactNode;
    // default Elements Props
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
    static defaultProps = {
        shape: 'circle' as AvatarProps['shape'],
        size: 'default' as AvatarProps['size'],
    };

    state = {
        scale: 1,
        mounted: false,
        isImgExist: true,
    };

    private avatarNode!: HTMLElement;

    private avatarChildren!: HTMLElement;

    private lastChildrenWidth!: number;

    private lastNodeWith!: number;

    componentDidMount() {
        this.setScale();
    }

    componentDidUpdate(prevProps: AvatarProps) {
        this.setScale();
        if (prevProps.src !== this.props.src) {
            this.setState({ isImgExist: true, scale: 1 });
        }
    }

    setScale() {
        if (!this.avatarChildren || !this.avatarNode) {
            return;
        }
        const childrenWidth = this.avatarChildren.offsetHeight;
        // offsetWidth avoid affecting be transform scale
        const nodeWidth = this.avatarNode.offsetWidth;
        // denominator is 0 is no meaning
        if (childrenWidth === 0 || nodeWidth === 0 || (this.lastChildrenWidth === childrenWidth && this.lastNodeWith === nodeWidth)) {
            return;
        }

        this.lastChildrenWidth = childrenWidth;
        this.lastNodeWith = nodeWidth;

        // add 4px gap for each side to get better performance
        this.setState({
            scale: nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1,
        });
    }

    handleImgLoadError = () => {
        const { onError } = this.props;
        const errorFlag = onError ? onError() : undefined;
        if (errorFlag !== false) {
            this.setState({ isImgExist: false });
        }
    };

    renderAvatar = ({ getPrefixCls }: any /*ConfigConsumerProps*/) => {
        const { prefixCls: customizePrefixCls, shape, size, src, srcSet, icon, className, alt, ...others } = this.props;

        // warning('')

        const { isImgExist, scale, mounted } = this.state;

        const prefixCls = getPrefixCls('avatar', customizePrefixCls);

        const sizeCls = classNames({
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
        });

        const classString = classNames(prefixCls, className, sizeCls, {
            [`${prefixCls}-${shape}`]: shape,
            [`${prefixCls}-image`]: src && isImgExist,
            [`${prefixCls}-icon`]: icon,
        });

        const sizeStyle: React.CSSProperties =
            typeof size === 'number'
                ? {
                      width: size,
                      height: size,
                      lineHeight: `${size}px`,
                      fontSize: icon ? size / 2 : 18,
                  }
                : {};
        let { children } = this.props;
        if (src && isImgExist) {
            children = <img src={src} srcSet={srcSet} onError={this.handleImgLoadError} alt={alt} />;
        } else if (icon) {
            children = icon;
        } else {
            const childrenNode = this.avatarChildren;
            if (childrenNode || scale !== 1) {
                const transformString = `scale(${scale}) translateX(-50%)`;
                const childrenStyle: React.CSSProperties = {
                    msTransform: transformString,
                    WebkitTransform: transformString,
                    transform: transformString,
                };

                const sizeChildrenStyle: React.CSSProperties = typeof size === 'number' ? { lineHeight: `${size}px` } : {};

                children = (
                    <span
                        className={`${prefixCls}-string`}
                        ref={(node: HTMLElement) => (this.avatarChildren = node)}
                        style={{ ...sizeChildrenStyle, ...childrenStyle }}
                    >
                        {children}
                    </span>
                );
            } else {
                const childrenStyle: React.CSSProperties = {};
                if (!mounted) {
                    childrenStyle.opacity = 0;
                }
                children = (
                    <span
                        className={`${prefixCls}-string`}
                        style={{ opacity: 0 }}
                        ref={(node: HTMLElement) => (this.avatarChildren = node)}
                    >
                        {children}
                    </span>
                );
            }
        }
        return (
            <span {...others} style={{ ...sizeStyle, ...others.style }} ref={(node: HTMLElement) => (this.avatarNode = node)}>
                {children}
            </span>
        );
    };
    render() {
        // return <ConfigConsumer>{this.renderAvatar}</ConfigConsumer>;
        return <>{this.renderAvatar}</>;
    }
}
