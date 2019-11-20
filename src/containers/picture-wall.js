import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';
import PictureWallUI from '../component/product/picture-wall';
import {changeFileListAction} from '../actions/actionOperations/action-picture-wall-operation'
import { reqDeleteImg } from '../api';

export class PictureWall extends Component {
    constructor(props){
        super(props)
        this.state={
            previewVisible: false,
            previewImage: ''
        }
    }
    /*关闭大图预览*/
    handleCancel = () => this.setState({ previewVisible: false });
    /*显示图片*/
    handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await this.getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
    };
    /*转换为base64格式*/
    /*
    file:当前操作的图片文件，可能是上传，也可能是删除
    fileList:所有已上传图片文件对象的数组
    */
    handleChange = async ({ file,fileList }) => {
        const status = file.status;
        if(status === "done"){ /*图片上传完成*/
            const result = file.response;
            if(result.status === 0){ /*图片上传成功*/
                message.success("图片上传成功")
                const {name,url} = result.data;
                let newFile = fileList[fileList.length - 1];
                newFile.name = name;
                newFile.url  = url;
            }else{
                message.error("图片上传失败")
            }
        }else if(status === "removed"){ /*删除图片*/
            const result = await reqDeleteImg(file.name);
            if(result.status === 0){
                message.success("图片删除成功")
            }else{
                message.error("图片删除失败")
            }
        }
        this.props.changeFileList(fileList)/*改变fileList*/
    }
    /*转换为base64*/
    getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
    render() {
        let {
            fileList /*最新的fileList数组*/
        }=this.props
        return (
            <PictureWallUI 
                previewVisible={this.state.previewVisible}
                previewImage={this.state.previewImage}
                fileList={fileList}
                handlePreview={this.handlePreview}
                handleChange={this.handleChange}
                handleCancel={this.handleCancel}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    fileList:state.pictureWall.fileList
})

const mapDispatchToProps = (dispatch)=>({
    changeFileList:(newFileList)=>{ /*修改filelist数组的内容*/
        dispatch(changeFileListAction(newFileList))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PictureWall)
