import React from 'react';
import {
    Card,
    Table,
    Button,
    Modal
} from 'antd'
import Add from './add'
import Auth from './auth'
import getTime from '../../tools/getTime'

const columns = [
    {
        title: '分类名称',
        dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(create_time)=>getTime(create_time)
    },
    {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:(auth_time)=>getTime(auth_time)
    },
    {
        title: '授权人',
        dataIndex: 'auth_name',
    },
]



export default function Role(props) {

    let {
        data,
        onRow,
        role,
        addVisible,
        handleCancel,
        getFieldDecorator,
        roleOk,
        showModalTitle,
        authOk,
        authVisible,
        name,
        authList,
        onSelect,
        checkedKeys,
        onSelectCallback
    }=props
    const title =(
        <span>
            <Button 
                style={{marginRight:"10px"}} 
                type="primary" 
                onClick={()=>{showModalTitle("add")}}
            >
                创建角色
            </Button>
            <Button 
                type="primary" 
                disabled = {!role._id}
                onClick={()=>{showModalTitle("auth")}}
            >
                设置角色权限
            </Button>
        </span>
    )
    return (
        <Card title={title}>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                rowKey="_id"
                pagination={{
                    defaultPageSize:3,
                    showQuickJumper:true,
                    hideOnSinglePage:true,
                }}
                rowSelection={{
                    type:"radio",
                    selectedRowKeys:role._id,
                    onSelect:onSelectCallback

                }}
                onRow={onRow}
            />
            <Modal
                title="添加角色"
                visible={addVisible}
                onOk={roleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
                >
                <Add
                    getFieldDecorator={getFieldDecorator}
                />
            </Modal>
            <Modal
                title="设置角色权限"
                visible={authVisible}
                onOk={authOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
                >
                <Auth 
                    name={name} 
                    authList={authList}
                    onSelect={onSelect}
                    checkedKeys={checkedKeys}
                />
            </Modal>
        </Card>
    )
}
