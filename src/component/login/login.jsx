import React from 'react'
import './login.less'
import logo from '../../assets/images/logo.png';
import { Form, Icon, Input, Button } from 'antd';

export default function Login(props) {
    return (
        <div className="login">
            <div className="header">
                <img src={logo} alt="logo"/>
                <h1>测试项目:后台管理系统</h1>
            </div>
            <div className="loginBox">
                <h1>用户登录</h1>
                <Form onSubmit={props.handleSubmit} className="login-form">
                    <Form.Item>
                    {props.getFieldDecorator('username', {
                        rules: [
                            {required: true,whitespace:true,message: '账号不能为空或者空格!' },
                            {max:12,message:"账号的长度小于等于12"},
                            {min:4,message:"账号的长度大于等于4"},
                            {pattern:/^[a-zA-Z0-9]+$/,message:"账号的必须为大写或者小写字母以及数字"}
                        ],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {props.getFieldDecorator('password', {
                        rules: [
                            { validator:props.checkPassWord}
                        ],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
