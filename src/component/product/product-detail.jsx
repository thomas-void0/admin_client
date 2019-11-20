import React from 'react'
import {
    Card,
    List,
    Icon
} from 'antd'
import './product-detail.less';
import MyButton from '../button/button';

const {Item} = List;

export default function ProductDetail(props) {
    let {
        history,
        location,
        firstCategory,
        secondCategory
    }=props
    const {
        name,
        desc,
        detail,
        imgs,
        price
    }=location
    const title = (
        <MyButton onClick={()=>{history.goBack()}}>
            <Icon type="arrow-left"/>
            <span>商品详情</span>
        </MyButton>
    )
    return (
        <Card title={title} className="product-detail">
            <List>
                <Item className="left">
                    <span>商品名称:</span>
                    <span>{name}</span>
                </Item>
                <Item className="left">
                    <span>商品描述:</span>
                    <span>{desc}</span>
                </Item>
                <Item className="left">
                    <span>商品价格:</span>
                    <span>{price}</span>
                </Item>
                <Item className="left">
                    <span>所属分类:</span>
                    <span>{firstCategory + (secondCategory ? "--->"+ secondCategory : null)}</span>
                </Item>
                <Item className="left">
                    <span>商品图片:</span>
                    <span>
                        {imgs.map((item,index)=>
                            <img key={index} src={"http://localhost:5000/upload/"+item} alt="img" className="product-img"/>
                        )}
                    </span>
                </Item>
                <Item className="left">
                    <span>商品详情:</span>
                    <span style={{color:"#1890ff",marginTop:"15px"}} dangerouslySetInnerHTML={{__html:detail}} />
                </Item>
            </List>
        </Card>
    )
}
