$(function () {
    // 阻止默认事件;
    var register_form = document.getElementById("login_form");
    register_form.onsubmit = function(evt){
        var e = evt || window.event;
        e.preventDefault();
    }


    // 点击发送数据;
    var submit = document.getElementById("login-btn");
    submit.addEventListener("click",login);

    var username = document.getElementById("uname");
    var password = document.getElementById("pwd");

    function login(){
        // 1. 获取 input 之中的值;
        var usr_str = username.value;
        // console.log(usr_str);
        var pwd_str = password.value;
        // console.log(pwd_str);

        // 2. 调用 ajax 封装 实现数据发送;

        // 根据接口文档定义的一个数据对象;
        var data = {
            username : usr_str,
            password : pwd_str
        }

        ajaxPost("http://localhost:8888/pub_php/login.php",data)
            .then(function(res){
                console.log(res);
            })

    }

    function ajaxPost(url,data){
        // console.log(data);
        return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

            // 现在的data是一个对象, 但是根据我们的设置我们要把data转换成一个对象;
            console.log(data);
            var data_str = "";
            for(var attr in data){
                if(data_str.length !== 0){
                    data_str += "&";
                }
                data_str += attr + "=" + data[attr];
            }
            // {username : 123456, password :12346};
            // console.log(data_str);
            xhr.send(data_str);

            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    resolve(xhr.response);
                }
            }

        })
    }
});



                /*Tab栏切换*/
// 1. 创建构造函数;
function Tab(btn_selector  , content_selector ){
    // 写属性;
    // 当前显示的下标;
    this.index = 0;
    this.btns = document.querySelectorAll(btn_selector);
    this.contents = document.querySelectorAll(content_selector);
}
// 初始化功能;
Tab.prototype.init = function(event_type){

    this.event_type = event_type ? event_type : "click";
    // 调用核心的方法;
    // 根据参数做相应的判断决定调用哪些功能;
    this.btns = Array.from(this.btns);
    this.contents = Array.from(this.contents);

    this.bindEvent();
}
// 绑定事件功能;
Tab.prototype.bindEvent = function(){
    this.btns.forEach((item,index)=>{
        // console.log(this); // this 指向实例化对象;
        item.addEventListener(this.event_type,this.changeIndex.bind(this,index))

        item.addEventListener(this.event_type,this.changeClass.bind(this));
    });
}
// 1. 改变Index;
// 2. 根据index 添加修改类名;
Tab.prototype.changeIndex = function(index){
    // console.log(index);
    this.index = index;
    // 更新了index;
}
Tab.prototype.changeClass = function(){
    // 1. 清空;
    // 2. 给对应下标去添加class;
    this.contents.forEach((item , index)=>{
        item.className = item.className.replace(/\sselectedIt/g,"");
        this.btns[index].className = "";
    })

    this.contents[this.index].className += " selectedIt";
    this.btns[this.index].className += " selectedIt";
}

var tab = new Tab(".login-wrap span",".content-box");
tab.init("click");
