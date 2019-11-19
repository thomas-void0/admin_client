import React from 'react'
import { Form,Input} from 'antd';

export default function Update(props) {
    return (
        <Form>
            <Form.Item>
            {props.getFieldDecorator('categoryName', {
                initialValue:props.categoryName,
                rules: [{ required: true, message: '必须输入名称' }],
            })(
                <Input
                placeholder="输入分类的名称"
                />,
            )}
            </Form.Item>
        </Form>
    )
}
