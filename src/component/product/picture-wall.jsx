import React from 'react'
import { Upload, Icon, Modal } from 'antd';

export default function PictureWall2(props) {
    const { 
        previewVisible, 
        previewImage, 
        fileList,
        handlePreview,
        handleChange,
        handleCancel
    } = props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
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
                onPreview={handlePreview}/*显示对应图片的大图*/
                onChange={handleChange}/*上传文件改变时的状态*/
            >
            {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal 
                visible={previewVisible} 
                footer={null} 
                onCancel={()=>{handleCancel()}}
            >
            <img 
                alt="example" 
                style={{ width: '100%' }} 
                src={previewImage} 
            />
            </Modal>
      </div>
    )
}
