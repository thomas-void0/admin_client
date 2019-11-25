import React, { Component } from 'react'
import UserUI from '../component/user/user';
import {
    reqGetUser,
    reqAddUser,
    reqDeleteUser,
    reqUpdateUser
} from '../api'
import { message,Form } from 'antd';

class User extends Component {
    constructor(props){
        super(props)
        this.state={
            initUserList:[],/*用户列表*/
            visible:false,/*模态框显示状态*/
            rolesNames:[],/*角色名字数组*/
            roles:[],/*角色列表*/
            delVisible:false,/*删除用户的弹出框状态*/
            user:null, /*当前选中的用户信息*/
            modalFlag:null, /*判读modal是增加还是修改*/
            updateUser:null /*点击修改得到的用户信息*/
        }
    }
    /*获取用户列表*/
    initUser = async ()=>{
        const result = await reqGetUser()
        if(result.status === 0){
            const initUserList = result.data.users;
            const roles = result.data.roles;
            const rolesNames = roles.reduce((pre,role)=>{
                pre[role._id] = role.name
                return pre
            },{}) 
            this.setState({
                initUserList,
                rolesNames,
                roles
            })
        }else{
            message.error("获取角色失败")
        }
    }
    /*模态框点击确定*/
    handleOk = ()=>{
        //收集表单数据
        this.props.form.validateFields( async(err,values)=>{
            const flag = this.state.modalFlag;
            if(!err){
                let result = null;
                const {username,email,phone,role_id} = values;
                if(flag === "add"){
                    const {password} = values;
                    result = await reqAddUser({
                        username,
                        password,
                        email,
                        phone,
                        role_id
                    })
                }else{
                    const {_id} = this.state.updateUser;
                    result = await reqUpdateUser({
                        username,
                        _id,
                        email,
                        phone,
                        role_id
                    })
                }
                if(result.status === 0){
                    message.success(`${flag==="add" ? "用户添加成功" : "修改成功"}`)
                    this.props.form.resetFields()
                    this.initUser()
                    this.setState({
                        visible:false
                    })
                }else{
                    message.error(`${flag==="add" ? "用户添加失败" : "修改失败:"+result.msg}`)
                }

            }
        })
    }
    /*模态框点击取消*/
    handleCancel = ()=>{
        this.setState({
            visible:false,
            delVisible:false
        })
    }
    /*添加用户*/
    addUser = ()=>{
        this.setState({
            visible:true,
            modalFlag:"add"
        })
    }
    /*下拉选择框的回调函数*/
    handleSelect=(value)=>{
        
    }
    /*弹出弹窗*/
    delUserModal = (user)=>{
        this.setState({
            delVisible:true,
            user
        })
    }
    /*删除用户*/
    delUser = async ()=>{
        const user = this.state.user;
        const _id = user._id;
        const result = await reqDeleteUser(_id);
        if(result.status === 0){
            message.success("删除成功")
            this.initUser()
        }else{
            message.error("删除失败")
        }
        this.setState({
            delVisible:false
        })
        
    }
    /*显示修改用户弹窗*/
    updateUserModal = (updateUser)=>{
        //获取当前用户的所有信息
        this.setState({
            updateUser,
            visible:true,
            modalFlag:"update"
        })
    }
    componentDidMount() {
        this.initUser()
    }
    
    render() {
        let {
            initUserList,
            visible,
            rolesNames,
            roles,
            delVisible,
            updateUser,
            modalFlag
        }=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <UserUI 
                initUserList={initUserList}
                visible={visible}
                handleCancel={this.handleCancel}
                handleOk={this.handleOk}
                addUser={this.addUser}
                getFieldDecorator={getFieldDecorator}
                rolesNames={rolesNames}
                roles={roles}
                handleSelect={this.handleSelect}
                delUser={this.delUser}
                delVisible={delVisible}
                delUserModal={this.delUserModal}
                updateUserModal={this.updateUserModal}
                updateUser={updateUser}
                modalFlag={modalFlag}
            />
        )
    }
}
const UserForm = Form.create({})(User);
export default UserForm