import React from 'react';
import {
    Card,
    Input,
    Form,
    Cascader,
    Upload,
    Button,
    Icon
} from 'antd';
import MyButton from '../button/button'

const {Item} = Form;
const {TextArea} = Input;

function ProductAdd(props) {
    const title = (
        <span>
            <MyButton>
                <Icon type="arrow-left" style={{fontSize:20}}/>
            </MyButton>
            <span>添加商品</span>
        </span>
    )
    const formItemLayout = {
        labelCol: { span: 2 }, /*left宽度*/
        wrapperCol: { span: 8 },
    };
    let {
        getFieldDecorator,
        submitFunc,
        validatorPrice,
        options,
        loadData
    }=props
    return (
        <Card title={title}>
            <Form {...formItemLayout}>
                <Item label="商品名称">
                    {getFieldDecorator('name',{
                        initialValue:"",
                        rules:[
                            {required:true,message:"商品名称必须输入"}
                        ]
                    })(
                        <Input placeholder="请输入商品名称"/>
                    )}
                </Item>
                <Item  label="商品描述">
                    {getFieldDecorator('desc',{
                            initialValue:"",
                            rules:[
                                {required:true,message:"商品描述必须输入"},
                            ]
                    })(
                        <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 3}} />
                    )}
                   
                </Item>
                <Item label="商品价格">
                    {getFieldDecorator('price',{
                                initialValue:"",
                                rules:[
                                    {required:true,message:"商品的价格必须输入"},
                                    {validator:validatorPrice}
                                ]
                    })(
                        <Input type="number" placeholder="请输入商品价格" addonAfter="元"/>
                    )}
                </Item>
                <Item label="商品分类">
                    <Cascader
                        options={options}
                        loadData={loadData}/*当选择某个列表项，加载下一级的列表*/
                    />
                </Item>
                <Item label="商品图片">
                    <div>商品图片</div>
                </Item>
                <Item label="商品详情">
                    <div>商品详情</div>
                </Item>
                <Item>
                    <Button type="primary" onClick={()=>{submitFunc()}}>提交</Button>
                </Item>
            </Form>
        </Card>
    )
}
export default ProductAdd