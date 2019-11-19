import Ajax from './ajax';
import jsonp from 'jsonp';
import {message} from 'antd';
// 请求登陆
export const reqLogin = (username,password)=>{
    return Ajax("/login",{username,password},"POST");
}
// 请求数据
export const reqCategoryData = (parentId)=>{
    return Ajax("/manage/category/list",{parentId},"GET");
}
//添加分类
export const reqCategoryAdd = ({parentId,categoryName})=>{
    return Ajax("/manage/category/add",{parentId,categoryName},"POST")
}
//更新分类
export const reqCategoryUpdate = ({categoryId,categoryName})=>{
    return Ajax("/manage/category/update",{categoryId,categoryName},"POST");
}
//获取商品分页列表
export const reqProducts =(pageNum,pageSize)=>{
    return Ajax("/manage/product/list",{pageNum,pageSize},"GET")
}
//搜索商品分页列表
export const reqSearchProducts = (pageNum,pageSize,searchName,searchType)=>{
    return Ajax("/manage/product/search",{pageNum,pageSize,[searchType]:searchName},"GET")
}
//删除图片
export const reqDeleteImg = (name) =>{
    return Ajax('/manage/img/delete',{name},"POST");
}
//添加商品
export const reqAddOrUpdateProduct = (product)=>{
    return Ajax("/manage/product/"+(product._id ? "update" : "add"),product,"POST")
}
// jsonp请求
export const reqWeather = (city)=>{
    const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(err,data)=>{
            if(!err && data.status === "success"){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather})
            }else{
                message.error("获取天气信息失败"); //直接在这里处理错误
            }
        })
    })

}