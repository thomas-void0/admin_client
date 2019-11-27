import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminUI from '../component/admin/admin'
import ramInfo from '../tools/ramInfo';
import {Redirect} from 'react-router-dom';
import menuList from '../config/initMenu';
import {Modal } from 'antd';
import {changeTimeFunc} from '../actions/actionOperations/action-admin-operation';
import localInfo from '../tools/localInfo';
import {reqWeather} from '../api';

const { confirm } = Modal;

export class Admin extends Component {
    constructor(props){
        super(props)
        this.state={
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
