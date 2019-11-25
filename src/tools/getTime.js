export default (time)=>{
    let date = null;
    if(time){
        date = new Date(time)
    }else{
        return null
    }
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate() + "  " +
    date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds()
}