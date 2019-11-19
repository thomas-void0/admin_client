import React from 'react'
import { Upload, Icon, Modal,message } from 'antd';
import {reqDeleteImg} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    //   {
    //     uid: '-1',/*每个file都是自己唯一的id*/
    //     name: 'image.png',/*图片文件名*/
    //     status: 'done',/*图片状态 done-已上传*/
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //   }
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  /*
  file:当前操作的图片文件，可能是上传，也可能是删除
  fileList:所有已上传图片文件对象的数组
  */
  handleChange = async ({ file,fileList }) =>{
    const status = file.status;
    if(status === "done"){ /*说明图片上传完成*/
        const result = file.response;
        if(result.status === 0){/*图片上传成功*/
            message.success("图片上传成功");
            const {name,url} = result.data;
            let newFile = fileList[fileList.length - 1];/*新添加的图片在数组的最后一个 */
            newFile.name = name;
            newFile.url = url;
        }else{
            message.error("上传图片失败");
        }
    }else if(status === "removed"){
       const result = await reqDeleteImg(file.name);
       if(result.status === 0){
            message.success("删除图片成功")
       }else{
           message.error("删除图片失败")
       }
    }
    this.setState({ fileList });
  } 
  /*获取所有已上传图片文件名的数组*/
  getImgs = ()=>{
      return this.state.fileList.map(file=>file.name)
  }
  render() {                          
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"/*上传图片的接口地址*/
          accept="image/*"/*只接收图片格式*/
          name="image"/*请求参数名*/
          listType="picture-card" /*卡片样式*/
          fileList={fileList}/*所有已上传图片文件对象的数组*/
          onPreview={this.handlePreview}/*显示对应图片的大图*/
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall