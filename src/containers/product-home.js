import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductHomeUI from '../component/product/product-home';
import MyButton from '../component/button/button';
import { 
    Button,
    Form
} from 'antd';
import {reqProducts,reqSearchProducts} from '../api'


export class ProductHome extends Component {
    constructor(props){
        super(props)
        this.state={
            title:null, /*商品管理左边的搜索部分的jsx*/
            extra:null, /*商品管理右边的添加商品部分的jsx*/
            products:[], /*表格分类*/
            total:0, /*商品的总数量*/
            data:[],/*商品信息*/
            loading:false,/*加载动画*/
            searchType:"productName",/*搜索类型*/
            searchName:""/*关键词*/
        }
    }
    /*初始化表格列的数组*/
    initColumns = ()=>{
        const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
                title: '价格',
                width:120,
                dataIndex: 'price',
                render:(price)=> "￥" + price
            },
            {
                title: '状态',
                width:100,
                render:(status)=> {
                    return(
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width:100,
                render:(status)=> {
                    return(
                        <span>
                            <MyButton>详情</MyButton>
                            <MyButton>修改</MyButton>
                        </span>
                    )
                }
            },
          ];

        this.setState({
            products:columns
        })
    }
    // 初始化搜索框
    // initFindInput = ()=>{
    //     return(

    //     )
    // }
    /*关键词输入框监听事件*/
    handleKeyWordsInput =(event)=>{
        this.setState({
            searchName:event.target.value
        })
    }
    /*下拉框监听事件*/ 
    handleSelect =(value)=>{
        this.setState({searchType:value})
    }
    // 初始化添加商品
    initAddProduct = ()=>{
        return (
            <Button type="primary" icon="plus" onClick={()=>{
                this.props.history.push("/product/add")
            }}>
                添加
            </Button>
        )
    }
    /*获取商品信息*/
    getProductInfo = async(pageNum)=>{
        /*如果关键词存在，说明是进行搜索*/
        this.setState({
            loading:true
        })
        let result = null;
        const {searchName,searchType} = this.state;
        if(searchName){
            result = await reqSearchProducts(pageNum,3,searchName,searchType)
        }else{/*普通分页搜索*/
            result = await reqProducts(pageNum,3)
        }
       this.setState({
            loading:false
        })
       if(result.status === 0){
        const {total,list} = result.data;
        this.setState({
            total,
            data:list
        })
       }
    }
    UNSAFE_componentWillMount(){
        this.initColumns()
        this.setState({
            extra:this.initAddProduct()
        })
    }
    componentDidMount() {
        this.getProductInfo(1)
    }
    
    render() {
        let {
            extra,
            products,
            data,
            total,
            loading,
            searchName,
            searchType
        }=this.state
        return (
            <ProductHomeUI 
                extra={extra}
                columns={products}
                data={data}
                total={total}
                getProductInfo={this.getProductInfo}
                loading={loading}
                handleKeyWordsInput={this.handleKeyWordsInput}
                searchName={searchName}
                searchType={searchType}
                handleSelect={this.handleSelect}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}
const ProductHomeForm = Form.create({})(ProductHome);
export default connect(mapStateToProps, mapDispatchToProps)(ProductHomeForm)
