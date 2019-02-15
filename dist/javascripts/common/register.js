$(function () {
    // 阻止默认事件;
    var register_form = document.getElementById("register_form");
    register_form.onsubmit = function(evt){
        var e = evt || window.event;
        e.preventDefault();
    }


    // 点击发送数据;

    var submit = document.getElementById("register-btn");
    var username = document.getElementById("uname");
    var password = document.getElementById("pwd");

    submit.addEventListener("click",register);
    function register(){
        var usr_value = username.value;
        var pwd_value = password.value;

        var url = "http://localhost:8888/honorProject/pub_php/register.php";
        // url += `?username=${usr_value}&password=${pwd_value}`;
        // ajaxPost(url,`username=${usr_value}&password=${pwd_value}`)
        // 我们把 data 字符串数据优化成对象模式,方便数据的传递;

        var data = {
            username:usr_value,
            password:pwd_value,
            admin : 123
        }
        ajaxPost(url,data)
            .then(function(res){
                console.log(res);
            })
    }

    // 但是使用回调函数我们就面临回调地狱;
    // 使用promise =>  就没有回调函数;
    function ajaxPost(url,data){
        return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            // 让http协议识别当前我的发送规则;
            // 设置http协议发送数据的规则;
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

            // 对对象进行二次处理;

            // 只要不是我们想要的结果（原因），那么我们就做某些事情;
            var data_str = "?";
            for(var attr in data){
                if(data_str.length !== 1){
                    data_str += "&";
                }
                data_str += attr+"="+data[attr]
            }

            // console.log(data_str);
            xhr.send(data);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    resolve(xhr.response);
                }
            }
        })
    }

    // 发送数据时，POST 和 GET是有一定区别的， POST发送数据需要定义请求头; setRequtestHeader();

    // 设置http协议发送数据的规则;  表单的url编码格式;

    // 1. 创建xhr;
    // 2. 配置xhr .open();  *
    // 3. 设置请求头 (form 和 urlencode编码); *
    // 4. xhr.send(data);   *
    // data ? 格式是什么样的 ?  字符串 (规则 用 = 进行拼接 用 &进行连接)
    // 5. 通过事件判断当前请求是否完全成功; readyState === 4 status === 200;


    // 排错;
    // 1.  报错;

    // 1. TypeError 类型错误;
    // 1.1 函数错误使用; xxx is not a function
    //例:
    //  var fn ;
    //  fn();
    // 1.2 对象类型错误;  Cannot set property 'a' of undefined
    //  var obj;
    //  obj.a = 10;

    // 2. ReferenceError 引用错误;
    //  a is not defined

    // 3. SyntaxError
    //  a = 10；

    // 4. JSON 转换报错;

    //   var str = '{"a":1}';
    //   console.log(JSON.parse(str));

    // 5. RangError 范围错误;


})






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

var tab = new Tab(".register-wrap a",".register-content-wrap .content-box");
tab.init("click");
