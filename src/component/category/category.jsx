import React from 'react'
import { Card,Table,Modal } from 'antd';
import "./category.less"
import Update from './update'
import Add from './add'

export default function Category(props) {
    return (
        <Card 
        title={props.title} 
        extra={props.button} 
        >
            <Table
                columns={props.columns}
                dataSource={props.data}
                bordered
                pagination={{
                    defaultPageSize:5,
                    showQuickJumper:true,
                    hideOnSinglePage:true,
                }}
                loading={props.loading}
            />
            <Modal
                title="添加分类"
                visible={props.addVisible}
                onOk={props.categoryAddOk}
                onCancel={props.categoryAddCancel}
                okText="确定"
                cancelText="取消"
                >
                <Add
                    getFieldDecorator={props.getFieldDecorator}
                    options={props.options}
                />
            </Modal>
            <Modal
                title="修改分类"
                visible={props.visible}
                onOk={props.categoryUpdate}
                onCancel={props.handleCancel}
                okText="确定"
                cancelText="取消"
                >
                <Update 
                    getFieldDecorator={props.getFieldDecorator}
                    categoryName={props.categoryName}
                />
            </Modal>
        </Card>

    )
}
