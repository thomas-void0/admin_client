import React from 'react'
import { Form,Input,Tree} from 'antd';

const Item = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}

export default function Auth(props) {
    let {
        name,
        authList,
        onSelect,
        checkedKeys
    }=props
    return (
        <div>
            <Form {...formItemLayout}>
                <Item label="角色名称：">
                    <Input
                        disabled
                        value={name}
                    />
                </Item>
            </Form>   

        <Tree
            checkable
            defaultExpandAll={true}
            onCheck={onSelect}
            checkedKeys={checkedKeys}
        >
          {authList}
        </Tree>         
        </div>

    )
}
