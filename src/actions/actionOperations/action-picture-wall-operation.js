import {GET_FILELIST,CHANGE_FILELIST,DETAIL_IMGS} from '../actionTypes/action-picture-wall-type';

/*改变filelist数组*/
export const changeFileListAction = (newFileList)=>{
    return {
        type:CHANGE_FILELIST,
        newFileList
    }
}   
/*得到最新的filelist数组*/
export const getFileListAction = ()=>{
    return {
        type:GET_FILELIST,
    }
}   

export const getImgsFromDetailAction=(imgs)=>{
    return {
        type:DETAIL_IMGS,
        imgs
    }
}
