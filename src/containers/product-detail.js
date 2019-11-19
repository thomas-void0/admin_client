import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductDetailUI from '../component/product/product-detail'

export class ProductDetail extends Component {
    render() {
        return (
            <ProductDetailUI />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
