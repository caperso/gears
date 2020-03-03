import React from 'react'
import './index.scss'


export const Loading = (props: { handleClick?: () => void }) => {
    return <span className="g-icon-rotate" onClick={props.handleClick} />
}

