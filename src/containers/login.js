import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginUI from '../component/login/login'
import { Form,message } from 'antd';
import {reqLogin} from '../api';
import ramInfo from '../tools/ramInfo';
import localInfo from '../tools/localInfo';
import {Redirect} from 'react-router-dom'

export class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
          if (!err) {
            // 将账号密码发送到后台
            const {username,password} = values;
            const reqData = await reqLogin(username,password);
            if(reqData.status === 0){ //登陆成功
              /*登陆成功后，将数据分别保存到内存中和localStrage中，以便下次免登录。*/ 
              localInfo.saveLocalData(reqData.data);
              /*存储到内存中的作用是为了在我们跳转登陆的时候，检测用户是否已经登陆了。实现自动跳转admin*/ 
              ramInfo.user = reqData.data;
              message.success("登陆成功");
              this.props.history.replace("/");//跳转到admin主页面
            }else{
              message.error("登陆失败:"+reqData.msg);
            }
          }
        });
    };
    checkPassWord = (rule,value,callback)=>{
        if(!value){
          callback("密码不能为空")
        }else if(value.length > 12){
          callback("密码的长度不能大于12")
        }else if(value.length < 4){
          callback("密码的长度不能小于4")
        }else if(!/^[a-zA-Z0-9]+$/.test(value)){
          callback("密码必须为大写或小写字母或者数字组成")
        }else{
          callback()
        }
    }
    render() {
      // 在渲染组件的时候，查询内存中是否已经有了登陆信息
        const user = ramInfo.user;
        if(user && user._id){
          return <Redirect to="/"/>
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <LoginUI  
            getFieldDecorator={getFieldDecorator}
            handleSubmit={this.handleSubmit}
            checkPassWord={this.checkPassWord}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}
const LoginForm = Form.create()(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)