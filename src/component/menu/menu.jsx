import React from 'react'
import './menu.less';
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';

export default function MenuUI(props) {
    return (
        <div>
          <div className="nav-title">
            <img src={logo} alt="logo"/>
            <h1>测试后台</h1>
          </div>
          <div>
          <Menu
            defaultSelectedKeys={[props.selectKey]}
            defaultOpenKeys={[props.openKey]}
            mode="inline"
            theme="dark"
          >
            {props.initDom}
          </Menu>
        </div>
      </div>
    )
}
