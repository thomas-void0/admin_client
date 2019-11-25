import React from 'react'
import { 
    Form,
    Input,
    Select 
} from 'antd';

const { Option } = Select;
const Item = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}


export default function Add(props) {
    let{
        handleSelect,
        roles,
        getFieldDecorator,
        updateUser,
        modalFlag
    }=props
    console.log("updateUser===",updateUser);
    return (
        <Form {...formItemLayout}>
            <Item label="用户名：">
                {getFieldDecorator('username', {
                    initialValue:
                        ( modalFlag === "update" ? updateUser.username : null),
                    rules: [
                        {required: true,whitespace:true,message: '账号不能为空或者空格!' },
                        {max:12,message:"账号的长度小于等于12"},
                        {min:4,message:"账号的长度大于等于4"},
                        {pattern:/^[a-zA-Z0-9]+$/,message:"账号的必须为大写或者小写字母以及数字"}
                    ],
                })(
                    <Input
                        placeholder="输入用户名"
                    />,
                )}
            </Item>
            { modalFlag === "add" ? 
                <Item label="密码：">
                    {getFieldDecorator('password', {
                        initialValue:"",
                        rules: [
                            {required: true,whitespace:true,message: '密码不能为空或者空格!' },
                            {max:12,message:"密码的长度小于等于12"},
                            {min:4,message:"密码的长度大于等于4"},
                            {pattern:/^[a-zA-Z0-9]+$/,message:"密码必须为大写或者小写字母以及数字"}
                        ],
                    })(
                        <Input
                            // type="password"
                            placeholder="输入密码"
                        />,
                    )}
                </Item>
            : null }
            <Item label="邮箱：">
                {getFieldDecorator('email', {
                    initialValue:( modalFlag === "update" ? updateUser["email"] : null),
                    rules: [
                        { required: true, whitespace:true,message: '必须输入邮箱' },
                        { pattern:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的邮箱格式' }
                    ],
                })(
                    <Input
                        type="email"
                        placeholder="输入邮箱"
                    />,
                )}
            </Item>
            <Item label="电话：">
                {getFieldDecorator('phone', {
                    initialValue:( modalFlag === "update" ? updateUser["phone"] : null),
                    rules: [
                        { required: true,whitespace:true, message: '必须输入电话' },
                        { pattern:/^1[3|4|5|8][0-9]\d{4,8}$/, message: '请输入正确的电话号码' }

                        
                    ],
                })(
                    <Input
                        placeholder="输入电话"
                    />,
                )}
            </Item>
            <Item label="角色：">
                {getFieldDecorator('role_id', {
                    rules: [{ required: true, message: '角色不能为空' }],
                    initialValue:( modalFlag === "update" ? updateUser["role_id"] : "5dda2f901b2c020448427fe6"),
                })(
                    <Select
                        placeholder="请选择一个角色"
                        onChange={value =>{handleSelect(value)}}
                    >
                    {roles.map((item,index)=>
                        <Option key={index} value={item._id}>{item.name}</Option>
                    )}
                    </Select>,
                )}
            </Item>
        </Form>
    )
}
