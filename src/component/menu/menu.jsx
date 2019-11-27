import React, { Component } from 'react'
import './menu.less';
import logo from '../../assets/images/logo.png'
import { Menu,Icon  } from 'antd';
import ramInfo from '../../tools/ramInfo';
import menuList from '../../config/initMenu';
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;

export default class MenuUI extends Component {
  constructor(props){
    super(props);
    this.state={
      initDom:null
    }
  }
      /*对路由权限表进行对比*/
      isRouteAuth = (item)=>{
        const {isPublic,key} = item;
        const menus = ramInfo.user.role.menus;
        const username = ramInfo.user.username;
        if(username === "admin" || menus.indexOf(key) !== -1 || isPublic){
            return true
        }else if(item.children){ //如果有某个子路由的权限，那么也显示这个
            return  !!item.children.find(child =>menus.indexOf(child.key) !== -1)
        }
        return false
    }
    // 初始化菜单
    initMenu=list=>{
        return list.map(item=>{
            const flag = this.isRouteAuth(item)
            if(flag){
                if(!item.children){
                    return(
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>                        
                            </Link>
                    </Menu.Item>
                    )
                }else{
                    return(
                        <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.initMenu(item.children)}
                    </SubMenu>
                    )
                }
            }

        })
    }
  UNSAFE_componentWillMount(){
      //初始化菜单
      const initData = this.initMenu(menuList);
      this.setState({
          initDom:initData
      })
  }
  render() {
      return (
        <div>
          <div className="nav-title">
            <img src={logo} alt="logo"/>
            <h1>测试后台</h1>
          </div>
          <div>
          <Menu
            defaultSelectedKeys={[this.props.selectKey]}
            defaultOpenKeys={[this.props.openKey]}
            mode="inline"
            theme="dark"
          >
            {this.state.initDom}
          </Menu>
        </div>
      </div>
    )
  }
}


