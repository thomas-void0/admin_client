import {GET_DATA,CHANGE_LOADING} from '../actionTypes/action-category-type';
import {reqCategoryData} from '../../api';
import {message} from 'antd'


//得到分类数据
export const getDataCategoryAction = (parentId)=>{
    let loadingAction = null;
    return async (dispatch)=>{
        //开始刷新
        loadingAction = {
            type:CHANGE_LOADING,
            loading:true
        }
        dispatch(loadingAction)
        const resultData = await reqCategoryData(parentId);
        //刷新结束
        loadingAction = {
            type:CHANGE_LOADING,
            loading:false
        }
        dispatch(loadingAction)

        if(resultData.status === 0){
            (resultData.data).forEach((item,index)=>{
                item.key = index;
            })
            const action = {
                type:GET_DATA,
                msg:resultData.data
            }
            dispatch(action)
        }else{
            message.error("数据请求出错")
        }


    }
}