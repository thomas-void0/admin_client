import React from 'react'
import './header.less'

export default function Header(props) {
    return (
        <div className="header">
            <div className="head-top">
                <span>欢迎,{props.username}</span>
                <button onClick={props.showConfirm}>退出</button>
            </div>
            <div className="head-bottom">
                <p>{props.navTitle}</p>
                <div>
                    <span>北京时间：{props.time}</span>
                    <span><img src={props.dayPictureUrl} alt="img"/></span>
                    <span>{props.weather}</span>
                </div>
            </div>
        </div>
    )
}
