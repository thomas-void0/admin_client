import React, { Component } from 'react'
import MenuUi from '../component/menu/menu'
import {connect} from 'react-redux'
import {changeCollapsed} from '../actions/actionOperations/action-menu-operation'
import MenuList from '../config/initMenu';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'

const { SubMenu } = Menu;


export class MenuCon extends Component {
    constructor(props){
        super(props)
        this.state={
            initDom:null
        }
    }
    initMenu=list=>{
        return list.map(item=>{
            console.log(item)
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
        })
    }
    UNSAFE_componentWillMount(){
        //初始化菜单
        const initData = this.initMenu(MenuList);
        this.setState({
            initDom:initData
        })
    }
    render() {
        console.log("sadfaaaaaa")
        return (
            <MenuUi />
        )
    }
}
const mapStateToProps = state => ({
    // collapsed:state.menu.collapsed
})

const mapDispatchToProps = dispatch=>({
    // toggleCollapsed:()=>{
    //     dispatch(changeCollapsed())
    // }
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu)