import {GET_FILELIST,CHANGE_FILELIST} from '../actions/actionTypes/action-picture-wall-type';

const defaultValue = {
        fileList: [
            // {
            // uid: '-1',/*每个file都是自己唯一的id*/
            // name: 'image.png',/*图片文件名*/
            // status: 'done',/*图片状态 done-已上传*/
            // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ],
}
export default (state=defaultValue,action)=>{
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case CHANGE_FILELIST:
            newState.fileList = action.newFileList
            return newState
        case GET_FILELIST:
            return newState
        default:
            return newState
    }
}