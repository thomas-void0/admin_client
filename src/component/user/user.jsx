import React from 'react'
import {
    Card,
    Table,
    Button,
    Modal,
    Icon
} from 'antd';
import getTime from '../../tools/getTime'
import MyButton from '../button/button'
import Add from './add'



export default function User(props) {
    let {
        initUserList,
        visible,
        handleOk,
        handleCancel,
        addUser,
        getFieldDecorator,
        rolesNames,
        roles,
        handleSelect,
        delUser,
        delUserModal,
        delVisible,
        updateUserModal,
        updateUser,
        modalFlag
    }=props

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render:(create_time)=>getTime(create_time)
        },
        {
            title: '角色',
            dataIndex: 'role_id',
            render:(role_id)=>rolesNames[role_id]
    
        },
        {
            title: '操作',
            render:(user)=>{
                return(
                    <span>
                        <MyButton 
                            onClick={()=>{updateUserModal(user)}} 
                            style={{marginRight:"10px"}}
                        >
                            修改
                        </MyButton>
                        <MyButton onClick={()=>{delUserModal(user)}}>删除</MyButton>                    
                    </span>
                )
            }
        },
    ]
    const title = (<Button onClick={addUser} type="primary" >增加用户</Button>)
    return (
        <Card title={title}>
            <Table
                columns={columns}
                dataSource={initUserList}
                bordered
                rowKey="_id"
                pagination={{
                    defaultPageSize:3,
                    showQuickJumper:true,
                    hideOnSinglePage:true,
                }}
            />
            <Modal
                title="添加角色"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
                >
                <Add
                    getFieldDecorator={getFieldDecorator}
                    roles={roles}
                    handleSelect={handleSelect}
                    updateUser={updateUser}
                    modalFlag={modalFlag}
                />
            </Modal>
            <Modal
                title="删除角色"
                visible={delVisible}
                onOk={delUser}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
                >
                
                <Icon 
                    style={{ fontSize: '24px', color: 'orange',marginRight:"10px" }}
                    type="question-circle"
                ></Icon>
                <span>是否要删除角色?</span>
            </Modal>
        </Card>
    )
}
