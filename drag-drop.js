function EventTarget(){
    this.handlers = {}
}
EventTarget.prototype = {
    contructor:EventTarget,
    addHandler:function(type,handler){
        if(typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler)
    },
    fire:function(event){
        if(!event.target){
            event.target = this;
        }
        if(this.handlers[event.type] instanceof Array){
            let handlers = this.handlers[event.type]
            for(let i=0,len=handlers.length;i<len;i++){
                handlers[i](event)
            }
        }
    },
    removeHandler:function(type,handler){
        if(this.handlers[type] instanceof Array){
            let handlers = this.handlers[type]
            for(var i=0,len=handlers.length;i<len;i++){
                if(handlers[i] === handler){
                    break;
                }
            }
            handlers.splice(i,1)
        }
    }
}

let DragDrop = function(){
    let dragdrop = new EventTarget() //创建自定义事件实例 
    let dragging = null;
    let diffX =null;
    let diffY =null;
    function handleEvent(event){
        //获取事件和目标
        let target = event.target;
        // 确定事件类型
        switch (event.type) {
            case "mousedown":
                if(target.className.indexOf("draggable") > -1){
                    dragging = target;
                    // 获得鼠标在点击时，在元素中的位置
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({type:"dragstart",target:dragging,
                                    x:event.clientX,y:event.clientY
                    })
                }
                break;
            case "mousemove":
                if(dragging !== null){
                    //指定位置
                    dragging.style.left = (event.clientX - diffX) + "px"
                    dragging.style.top = (event.clientY - diffY) + "px"
                    // 触发自定义事件
                    dragdrop.fire({type:"drag",target:dragging,x:event.clientX,y:event.clientY})
                }
                break;
            case "mouseup":
                dragdrop.fire({
                    type:"dragend",
                    target:dragging,
                    x:event.clientX,
                    y:event.clientY
                })
                dragging = null;
                break;
        }
    };
    // 公共接口
    dragdrop.enable = function(){
        document.addEventListener('mousedown',handleEvent,false)
        document.addEventListener('mousemove',handleEvent,false)
        document.addEventListener('mouseup',handleEvent,false)
    },
    dragdrop.disable = function(){
        document.removeEventListener('mousedown',handleEvent,false)
        document.removeEventListener('mousemove',handleEvent,false)
        document.removeEventListener('mouseup',handleEvent,false)
    }
    return dragdrop
}()
// DragDrop().enable()
// console.log(DragDrop().enable())
DragDrop.addHandler("dragstart",function(event){
    let status = document.getElementById("status")
    status.innerHTML = "Started drgging" + event.target.id
})
DragDrop.addHandler("drag",function(event){
    let status = document.getElementById("status");
    status.innerHTML += "<br/> Dragged " + event.target.id + " to (" + event.x +                          
                        "," + event.y + ")";
})
DragDrop.addHandler("dragend",function(event){
    let status = document.getElementById("status");
    status.innerHTML += "<br/> Dropped " + event.target.id + " at (" + event.x +                          
                        "," + event.y + ")"; 
})
DragDrop.enable()
DragDrop.disable()