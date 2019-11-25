import React from 'react'
import { Form,Input} from 'antd';
const Item = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
export default function Add(props) {
    return (
        <Form {...formItemLayout}>
            <Item label="创建角色：">
                {props.getFieldDecorator('roleName', {
                    initialValue:'',
                    rules: [{ required: true, message: '必须输入名称' }],
                })(
                    <Input
                        placeholder="输入角色名称"
                    />,
                )}
            </Item>
        </Form>
    )
}
