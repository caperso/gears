import { Button } from 'antd';
import React, { useRef } from 'react';
import './index.scss';
interface Props {
    text: string;
    handleChange?: (text:string) => void;
}

export const CodePaper = (props: Props) => {
    const textarea = useRef<HTMLTextAreaElement>(null);
    const updateChanges = () => {
        const text = textarea.current?.value;
        if(text && props.handleChange){
            props.handleChange(text)
        } 
    };
    return (
        <>
            <textarea ref={textarea} className="paper" >
                {props.text}
            </textarea>
            <Button onClick={updateChanges}>更新数据</Button>
        </>
    );
};
