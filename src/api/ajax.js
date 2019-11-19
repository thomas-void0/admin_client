import axios from 'axios';
import {message} from 'antd';

export default (url,data,type="GET")=>new Promise((resolve,reject)=>{
        let reqObject = null;
        if(type === "GET"){
            reqObject = axios.get(url,{params:data});
        }else{
            reqObject = axios.post(url,data);
        }  
        reqObject.then(res=>{
            resolve(res.data)
        }).catch(err=>{
            message.error("数据请求出错:"+err);
        })
    })

