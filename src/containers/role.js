import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoleUI from '../component/role/role'
import {reqGetRoles,reqAddRole,reqGetAuth} from '../api'
import {message,Form,Tree} from 'antd'
import menuList from '../config/initMenu';
import ramInfo from '../tools/ramInfo';

const { TreeNode } = Tree;

export class Role extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[], /*表格数据@data array*/
            role:{}, /*选中的role @role object*/
            addVisible:false,/*add对话框状态 @addVisible boolean*/
            authVisible:false, /*auth对话框状态 @authVisible boolean*/
            name:null, /*选中项目的名称 @name string*/
            authList:[],/*权限列表 @authList array*/
            menus:[],/*权限菜单 @menus array*/
            checkedKeys:[]/*默认选中的key @selectedKeys array */
        }
    }
    /*初始化权限列表*/
    initAuthList = (menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {item.children ? this.initAuthList(item.children) : null}
                </TreeNode>                
            )
            return pre
        },[])
    }
    /*点击表格每一行触发的回调函数*/
    onRow = (role)=>{
        const menus = role.menus
        return {
            onClick:(event)=>{
                console.log(role)
                this.setState({
                    role,
                    menus
                })
            }
        }
    }
    /*得到角色管理数据*/
    getRoles = async ()=>{
        const result  = await reqGetRoles();
        if(result.status === 0){
            const roles = result.data;
            this.setState({
                data:roles
            })
        }else{
            message.error("角色请求失败...")
        }
    }
    /*对话框，取消*/
    handleCancel = e => {
        this.props.form.resetFields()
        this.setState({
            addVisible: false,
            authVisible:false
        });
    };
    /*add对话框，确定*/
    handleOk = e => {
        this.props.form.validateFields(async (error,values)=>{
            if(!error){
                const {roleName} = values;
                const result = await reqAddRole(roleName)
                if(result.status === 0){
                    message.success("添加角色成功");
                    this.props.form.resetFields()
                    // this.getRoles();
                    const role = result.data;
                    /*使用函数的方法去更新状态*/
                    this.setState((state,props)=>({
                        data:[...state.data,role]
                    }))
                }else{
                    message.error("添加角色失败")
                }
                this.setState({
                    addVisible: false,
                });
            }
        })
    };
    /*对话框标题显示文字*/
    showModalTitle= (title)=>{
        if(title === "add"){
            this.setState({
                addVisible:true
            })
        }else{
            const {name} = this.state.role;
            this.setState({
                authVisible:true,
                name
            })
        }
    }
    /*选中后执行的回调函数*/
    onSelect = (CheckedKeys ,info)=>{
        this.setState({
            menus:CheckedKeys,
        })
    }
    /*auth对话框点击确定*/
    authOk = async ()=>{
        //得到选中的选项，menus
        //得到当前选中的对象 this.state.role
        const menus = this.state.menus;
        const {_id,auth_time} = this.state.role;
        const auth_name = ramInfo.user.username;
        const result = await reqGetAuth({_id,menus,auth_time,auth_name});
        if(result.status === 0){
            message.success(`给${this.state.name}添加权限成功`)
            //重新请求数据
            this.getRoles()
        }else{
            message.error(`给${this.state.name}添加权限失败`)
        }
        this.setState({
            authVisible:false,
        })
    }
    componentDidMount() {
        this.getRoles()
    }
    UNSAFE_componentWillMount(){
        const authList = this.initAuthList(menuList)
        this.setState({
            authList
        })
    }
    render() {
        let {
            data,
            addVisible,
            role,
            authVisible,
            name,
            authList,
            menus
        } = this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <RoleUI 
                onRow={this.onRow}
                data={data}
                getFieldDecorator={getFieldDecorator}
                roleOk={this.handleOk}
                handleCancel={this.handleCancel}
                addVisible={addVisible}
                showModalTitle={this.showModalTitle}
                role={role}
                authVisible={authVisible}
                name={name}
                authOk={this.authOk}
                authList={authList}
                onSelect={this.onSelect}
                checkedKeys={menus}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}
const RoleForm = Form.create({})(Role);
export default connect(mapStateToProps, mapDispatchToProps)(RoleForm)
