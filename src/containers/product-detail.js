import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductDetailUI from '../component/product/product-detail'
import {reqGetCategory} from '../api'



export class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            firstCategory:"",
            secondCategory:"",
        }
    }
    /*根据id获取分类*/
    getCategory = async ()=>{
        const {pCategoryId,categoryId} = this.props.location.state
        if(pCategoryId === "0"){ /*说明是一级分类*/
            const result = await reqGetCategory(categoryId);
            const secondCategory = result.data.name
            this.setState({
                secondCategory
            })
        }else{
            const result = await Promise.all([reqGetCategory(pCategoryId),reqGetCategory(categoryId)])
            const firstCategory = result[0].data.name;
            const secondCategory = result[1].data.name;
            this.setState({
                firstCategory,
                secondCategory
            })
        }
    }
    componentDidMount() {
        this.getCategory()
    }
    
    render() {
        let {
            firstCategory,
            secondCategory
        }=this.state
        let {
            name,
            desc,
            detail,
            imgs,
            price
        }=this.props.location.state
        return (
            <ProductDetailUI 
                history={this.props.history}
                firstCategory={firstCategory}
                secondCategory={secondCategory}
                name={name}
                desc={desc}
                detail={detail}
                imgs={imgs}
                price={price}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
