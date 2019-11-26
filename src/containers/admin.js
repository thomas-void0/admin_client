import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminUI from '../component/admin/admin'
import ramInfo from '../tools/ramInfo';
import {Redirect} from 'react-router-dom';
import menuList from '../config/initMenu';
import { Menu, Icon,Modal } from 'antd';
import {Link} from 'react-router-dom'
import {changeTimeFunc} from '../actions/actionOperations/action-admin-operation';
import localInfo from '../tools/localInfo';
import {reqWeather} from '../api';

const { confirm } = Modal;
const { SubMenu } = Menu;

export class Admin extends Component {
    constructor(props){
        super(props)
        this.state={
            initDom:null,
            dayPictureUrl:"",
            weather:"",
        }
    }
    // 获得初始化展开的菜单key
    getOpenKey = ()=>{
        let pathname = this.props.history.location.pathname;
        if(pathname.indexOf("/product") === 0){ //当前的请求是商品或者商品的子路由
            pathname="/product"
        }
        let key = null;
        menuList.forEach(item=>{
            if(item.children instanceof Array){
                const cItem = item.children.find(cItem=>{
                    return cItem.key === pathname
                })
                if(cItem){
                    key = (pathname==="/product" ? "/products": item.key)
                }
            }
        })
        return {key,pathname}
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
    // 获取导航内容
    getNavTitle=()=>{
        let {pathname} = this.props.history.location;
        let title = null;
        menuList.forEach(item=>{
            if(item.key === pathname){
                title = item.title
            }else if(item.children instanceof Array){
                const cItem = item.children.find(cItem=>pathname.indexOf(cItem.key)===0)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    // 点击退出
    showConfirm = ()=>{
        let that = this;
        confirm({
            title: '是否要退出?',
            okText: '退出',
            cancelText: '取消',
            onOk() {
            //清除掉内存中缓存的账号密码
            localInfo.removeLocalData();
            ramInfo.user = null;
            that.props.history.replace("/login");
            },
            onCancel() {
            },
        });
    }
    // 得到天气
    getWeather = async()=>{
        const {dayPictureUrl,weather} = await reqWeather("成都");
        this.setState({dayPictureUrl,weather})
    }
    UNSAFE_componentWillMount(){
        //初始化菜单
        const initData = this.initMenu(menuList);
        this.setState({
            initDom:initData
        })
    }
    componentDidMount() {
        this.timer = setInterval(()=>{
            if(this.props.changeTime instanceof Function){
                this.props.changeTime() 
            }
        },1000)
        this.getWeather();
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        const user = ramInfo.user;
        if(!user || !user._id){ //如果检测用户没有登陆，那么重定向到登陆页面
            return <Redirect to="/login"/>
        }
        const navTitle = this.getNavTitle();     
        const {key,pathname} = this.getOpenKey();
        return (
            <AdminUI 
                initDom={this.state.initDom}
                time={this.props.time}
                showConfirm={this.showConfirm}
                dayPictureUrl={this.state.dayPictureUrl}
                weather={this.state.weather}
                username={user.username}
                navTitle={navTitle}
                selectKey = {pathname}
                openKey={key}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    time:state.admin.time
})

const mapDispatchToProps= dispatch => ({
    changeTime:()=>{dispatch(changeTimeFunc())}
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
