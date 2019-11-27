import React from 'react'
import { Layout } from 'antd';
import MenuUI from '../menu/menu';
import {Switch,Route,Redirect} from 'react-router-dom';
import Category from '../../containers/category';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Home from '../home/home';
import Product from '../product/product';
import Role from '../../containers/role';
import User from '../../containers/user';
import Head from '../header/header';
import NotFound from '../not-found/not-found';

const {Footer, Sider, Content } = Layout;


function Admin(props) {
    return (
        <Layout style={{minHeight:"100%"}}>
            <Sider style={{width:"256px"}}>
                <MenuUI 
                initDom={props.initDom}
                selectKey={props.selectKey}
                openKey={props.openKey}
                />
            </Sider>
            
            <Layout>
                <Head 
                time={props.time}
                showConfirm={props.showConfirm}
                weather={props.weather}
                dayPictureUrl={props.dayPictureUrl}
                username={props.username}
                navTitle={props.navTitle}
                />
                <Content style={{margin:"20px",backgroundColor:"#fff"}}>
                    <Switch>
                        <Redirect from='/' to='/home' exact/>
                        <Route path="/home" exact component={Home}/>
                        <Route path="/category" component={Category}/>
                        <Route path="/product" component={Product}/>
                        <Route path="/role" component={Role}/>
                        <Route path="/user" component={User}/>
                        <Route path="/charts/line" component={Line}/>
                        <Route path="/charts/bar" component={Bar}/>
                        <Route path="/charts/pie" component={Pie}/>
                        <Route component={NotFound}/>
                    </Switch>
                 </Content>
              <Footer style={{backgroundColor:"white",textAlign:"center",fontSize:"24px",color:"#1890ff"}}>Are you ok?</Footer>
            </Layout>
        </Layout>
    )
}
export default Admin
