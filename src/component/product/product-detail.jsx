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
        firstCategory,
        secondCategory,
        name,
        desc,
        detail,
        imgs,
        price
    }=props
    const title = (
        <MyButton onClick={()=>{history.goBack()}}>
            <Icon type="arrow-left"/>
            <span>商品详情</span>
        </MyButton>
    )
    const dataArr = [
        {key:"商品名称:",value:name},
        {key:"商品描述:",value:desc},
        {key:"商品价格:",value:price},
        {key:"所属分类:",value:firstCategory + (secondCategory ? "--->"+ secondCategory : null)},
        {key:"商品图片:",value:imgs},
        {key:"商品详情:",value:detail},
    ]
    return (
        <Card title={title} className="product-detail">
            <List>
                {dataArr.map((item,index)=>{
                    if(item.value instanceof Array){
                        return (
                            <Item className="left">
                                <span>商品图片:</span>
                                <span>
                                    {imgs.map((item,index)=>
                                        <img 
                                            key={index} 
                                            src={"http://localhost:5000/upload/"+item} 
                                            alt="img" 
                                            className="product-img"
                                        />
                                    )}
                                </span>
                            </Item>
                        )
                    }else if(item.key==="商品详情:"){
                        return(
                            <Item className="left">
                                <span>商品详情:</span>
                                <span 
                                    style={{color:"#1890ff",marginTop:"15px"}} 
                                    dangerouslySetInnerHTML={{__html:item.value}} 
                                />
                            </Item>
                        )
                    }else{
                        return (
                            <Item className="left" key={index}>
                                <span>{item.key}</span>
                                <span>{item.value}</span>
                            </Item>  
                        )           
                    }
                })}
            </List>
        </Card>
    )
}
