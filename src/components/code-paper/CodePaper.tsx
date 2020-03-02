import { Button } from 'antd';
import React, { useRef } from 'react';
import './index.scss';
interface Props {
    text: string;
    buttonText?: string;
    handleChange?: (text: string) => void;
}

export const CodePaper = (props: Props) => {
    const textarea = useRef<HTMLTextAreaElement>(null);
    const updateChanges = () => {
        const text = textarea.current?.value;
        if (text && props.handleChange) {
            props.handleChange(text);
        }
    };
    return (
        <div className="g-code-paper-wrapper">
            <textarea ref={textarea} defaultValue={props.text} />
            {props.handleChange && <Button onClick={updateChanges}>{props.buttonText ? props.buttonText : '更新数据'}</Button>}
        </div>
    );
};
