import React from 'react'
import { Form,Input} from 'antd';
const Item = Form.Item;

export default function Add(props) {
    return (
        <Form>
            <Item>
                {props.getFieldDecorator('categoryName', {
                    initialValue:'',
                    rules: [{ required: true, message: '必须输入名称' }],
                })(
                    <Input
                    placeholder="输入分类的名称"
                    />,
                )}
            </Item>
        </Form>
    )
}
