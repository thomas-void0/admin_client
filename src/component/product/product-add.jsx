import React from 'react'
import {
    Card,
    Input,
    Button,
    Form,
    Icon,
    Cascader,
} from 'antd'
import MyButton from '../button/button';
import PictureWall from '../../containers/picture-wall';
import RichTextEditor from '../rich-text-editor/rich-text-editor';

const {Item} = Form;
const { TextArea } = Input;

/*输入框在容器中所占用的位置*/
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
}

export default function ProductAdd(props) {
    /*用于和表单进行双向绑定*/
    let { 
        getFieldDecorator, /*与表单进行数据绑定*/
        submitAddProduct,/*表单提交事件*/
        validatorPrice,/*价格验证函数*/
        options,/*级联选择器数组*/
        loadData,/*级联选择器第二级回调函数*/
        goBackToHome,/*返回上一级*/
        editor,/*refs容器组件*/
        name,
        desc,
        detail,
        price,
        imgs
    } = props;
    /*card的返回按钮*/ 
    const title = (
        <span>
            <MyButton onClick={()=>{goBackToHome()}}>
                <Icon type="arrow-left" style={{fontSize:20}}/>
                <span>返回上一级</span>
            </MyButton>
        </span>
    )
    return (
        <Card title={title}>
            <Form {...formItemLayout}>
                <Item  label="商品名称">
                    {getFieldDecorator("name",{
                        initialValue:name,
                        rules:[
                            {required:true,message:"商品名称必须输入"}
                        ]
                    })(<Input placeholder="请输入商品名称"/>)}
                </Item>
                <Item  label="商品描述">
                    {getFieldDecorator("desc",{
                        initialValue:desc,
                        rules:[
                            {required:true,message:"商品描述必须输入"}
                        ]
                    })(<TextArea 
                        placeholder="请输入商品描述"
                        autoSize={{ minRows: 2 }}
                    />)}
                </Item>
                <Item  label="商品价格">
                    {getFieldDecorator("price",{
                        initialValue:price,
                        rules:[
                            {required:true,message:"商品的价格必须输入"},
                            {validator:validatorPrice}
                        ]
                    })(<Input type="number" placeholder="请输入商品价格" addonAfter="元"/>)}
                </Item>
                <Item  label="商品分类">
                {getFieldDecorator("categoryIds",{
                        initialValue:[],
                        rules:[
                            {required:true,message:"分类不能为空"},
                        ]
                    })(<Cascader
                        options={options}
                        loadData={loadData}
                        placeholder="请选择分类"
                />)}
                </Item>
                <Item  label="商品图片">
                   <PictureWall /*ref={pw}*/ imgs={imgs}/>
                </Item>
                <Item  label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 18}}>
                   <RichTextEditor ref={editor} detail={detail}/>
                </Item>
                <Item labelCol={{span: 2}}>
                    <Button type="primary" onClick={()=>{submitAddProduct()}}>提交</Button>
                </Item>
            </Form>
        </Card>
    )
}