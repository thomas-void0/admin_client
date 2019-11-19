import React from 'react'
import './button.less'

export default function ButtonUI(props) {
    return (
        <button {...props} className="btn">{props.children}</button>
    )
}
