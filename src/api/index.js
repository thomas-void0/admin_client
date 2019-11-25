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
//根据id获取分类
export const reqGetCategory = (categoryId)=>{
    return Ajax("/manage/category/info",{categoryId},"GET")
}
//更新商品的状态，上架/下架
export const reqUpdateStatus = (productId,status)=>{
    return Ajax("/manage/product/updateStatus",{productId,status},"POST")
}
//删除图片
export const reqDeleteImg = (name) =>{
    return Ajax('/manage/img/delete',{name},"POST");
}
//添加商品
export const reqAddOrUpdateProduct = (product)=>{
    return Ajax("/manage/product/"+(product._id ? "update" : "add"),product,"POST")
}
// 获取所有角色的列表
export const reqGetRoles = ()=>{
    return Ajax('/manage/role/list',null,"GET")
}
// 添加角色
export const reqAddRole = (roleName)=>{
    return Ajax("/manage/role/add",{roleName},"POST")
}
//赋予角色权限
export const reqGetAuth = ({_id,menus,auth_time,auth_name})=>{
    return Ajax("/manage/role/update",{_id,menus,auth_time,auth_name},"POST")
}
//获取用户列表
export const reqGetUser = ()=>{
    return Ajax('/manage/user/list',null,"GET")
}
//添加用户
export const reqAddUser = ({username,password,phone,email,role_id})=>{
    return Ajax("/manage/user/add",{username,password,phone,email,role_id},"POST")
}
//删除用户
export const reqDeleteUser = (userId)=>{
    return Ajax("/manage/user/delete",{userId},"POST")
}
//修改用户
export const reqUpdateUser = ({username,_id,phone,email,role_id})=>{
    return Ajax("/manage/user/update",{username,_id,phone,email,role_id},"POST")
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