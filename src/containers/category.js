import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoryUI from '../component/category/category'
import {Button,Icon,Form,message} from 'antd';
import { getDataCategoryAction} from '../actions/actionOperations/action-category-operation'
import ButtonUI from '../component/button/button'
import {reqCategoryUpdate,reqCategoryAdd} from '../api'

export class Category extends Component {
    constructor(props){
        super(props);
        this.state = { 
            visible: false,
            columns:null,
            categoryName:null,
            categoryKey:null,
            tableGrade:1,
            parentId:"0",
            addVisible:false,
            pageNum:"0"
        };
    }
    // 点击显示修改对话框
    handleOk = () => {
        //在这里获取到输入框中的值
        console.log("ok==")
        this.setState({
          visible: false,
        });
    };
    handleCancel = () => {
        console.log("cancel")
        this.setState({
            visible: false,
        });
    };
    // 修改分类
    updateCategory = (categorys)=>{
        this.setState({
            visible: true,
            categoryName:categorys.name,
            categoryKey:categorys._id,
            parentId:categorys.parentId
        });
    }
    // 查看子分类
    checkChildCategory = (categorys)=>{
        console.log(categorys);
        this.setState({
            categoryKey:categorys._id,
            tableGrade:2,
            parentId:categorys._id,
        }, async ()=>{
            this.props.getCategoryData(this.state.categoryKey)
            this.getTitle()
        })
        
    }
    // 初始化
    initColums = ()=>{
        const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              width:"70%"
            },
            {
              title: '操作',
              render: (categorys)=>{
                  return(
                      <div>
                            <ButtonUI onClick={()=>{this.updateCategory(categorys)}}>修改分类</ButtonUI>
                            {this.state.tableGrade === 1 ? 
                                (<ButtonUI onClick={()=>{this.checkChildCategory(categorys)}}>查看子分类</ButtonUI>)
                            : null}
                      </div>
                  )
              }
            },
          ];
        return columns;
    }
    // 提交事件
    categoryUpdate = () => {
        this.props.form.validateFields( async (err, values) => {
          if (!err) {
            // 将values中的值传递到后台中,categoryName
            const {categoryName} = values;
            const categoryId = this.state.categoryKey;
            const result = await reqCategoryUpdate({categoryId,categoryName})
            // 清空输入框
            this.props.form.resetFields();
            if(result.status === 0){
                this.props.getCategoryData(this.state.parentId)//重新渲染界面
            }else{
                message.error("更新失败");
            }
            this.setState({
                visible: false,
            });
          }
        });
      };
    //点击返回一级菜单
    backToFirstTable = ()=>{
        // 重新请求数据
        this.setState({
            tableGrade:1,
            parentId:"0"
        })
        this.props.getCategoryData("0")
    }
    // 获得菜单目录
    getTitle = ()=>{
        return(
            <div>
                {this.state.tableGrade !== 2 ? (<span>一级菜单</span>) : (
                    <div>
                        <button style={{
                            cursor:"pointer",
                            border:"0",
                            backgroundColor:"transparent",
                            color:"#1890ff",
                            outline:"none"
                            }}
                            onClick={this.backToFirstTable}
                        >
                            一级菜单
                        </button>
                        <Icon type="double-right" />
                        <span style={{marginLeft:"10px"}}>二级菜单</span>
                    </div>
                )}
            </div>
        )
    }
    //点击添加
    categoryAdd = ()=>{
        //显示出输入框
        this.setState({
            addVisible:true
        })
    }
    //添加框点击OK
    categoryAddOk = ()=>{
        this.props.form.validateFields( async (err, values) => { 
            if(!err){
                const parentId = this.state.parentId,
                      categoryName = values.categoryName;
                const result = await reqCategoryAdd({parentId,categoryName})
                // 清空输入框
                this.props.form.resetFields();
                if(result.status === 0){
                    this.props.getCategoryData(parentId);
                }else{
                    message.error("分类添加失败")
                }
            }
        })
        this.setState({
            addVisible:false
        })
    }
    //添加框点击取消
    categoryAddCancel = ()=>{
        this.setState({
            addVisible:false
        })
    }
    // 初始化点击按钮
    setButton = ()=>{
        return(
            <Button type="primary" onClick={this.categoryAdd}>
                <Icon type="plus" />
                添加
            </Button>
        )
    }
    UNSAFE_componentWillMount(){
        this.setState({
            columns:this.initColums()
        })
    }
    componentDidMount() {
        this.props.getCategoryData("0")
    }
    
    render() {
        const title = this.getTitle()
        const button = this.setButton()
        const categoryData = this.props.data;
        const { getFieldDecorator } = this.props.form;
        return (
            <CategoryUI 
                data={categoryData}
                columns={this.state.columns}
                title={title}
                button={button}
                categoryUpdate={this.categoryUpdate}
                handleCancel={this.handleCancel}
                visible={this.state.visible}
                getFieldDecorator={getFieldDecorator}
                categoryName={this.state.categoryName}
                loading={this.props.loading}
                categoryAddOk={this.categoryAddOk}
                categoryAddCancel={this.categoryAddCancel}
                addVisible={this.state.addVisible}
                options={categoryData}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.category.data,
    loading:state.category.loading
})

const mapDispatchToProps = dispatch =>({
    getCategoryData:(parentId)=>{
        dispatch(getDataCategoryAction(parentId))
    }
})
const CategoryForm = Form.create({})(Category)
export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)
