// 1. 一定要先实现基本逻辑之后在实现动画逻辑;

// 这个数据告诉我我应该让 吸顶菜单处于什么样的状态;

// 标识变量; 只记录状态,且这个状态对后续操作产生影响的时候;
var toggle = "normal"; // active;
var timerTopBar = null;
var hasAnimate = false;

// normal 状态不用添加 class active;
// active 状态需要添加 class active;
var _top = 0; // st到达这个值时需要作出改变;

// target 是动画目标点;
var target = 0;
var speed = 2;

var top_bar = document.querySelector(".top_bar");

// 1. 判定一个 临界值;
window.addEventListener("scroll",isToggle);
function isToggle(){
// 卷动的高度;
    var st = document.body.scrollTop || document.documentElement.scrollTop;
if(st >= _top){
    toggle = "active";
}else{
     toggle = "normal";
 }
// console.log(toggle);
}

// 2. DOM操作再次封装;
window.addEventListener("scroll",setClass);
// 根据 toggle 更改dom属性;
function setClass(){
    var hasActive = /active/.test(top_bar.className);
if(toggle === "normal" && hasActive){
    top_bar.className = top_bar.className.replace(/\s+active/g,"");


    hasAnimate = false;
clearInterval(timerTopBar);
    top_bar.style.marginTop = 0;
    timerTopBar = null;
}

if(toggle === "active" && !hasActive){
    top_bar.className += " active";
}
}

// 3. 动画;
window.addEventListener("scroll",animate);
// 根据 toggle 更改dom属性;
function animate(){

if(toggle !== "active" || hasAnimate || timerTopBar !== null) return false;
// 终点 ;
// 只要应该运动;
    hasAnimate = true;
// 找到起始点;
    top_bar.style.marginTop = "-100px";
// 定时器运动到终止点;
timerTopBar = setInterval(function(){
    var mt = parseInt(top_bar.style.marginTop);
    // console.log(mt);

if(Math.abs(target - mt) <= Math.abs(speed)){
clearInterval(timerTopBar);
    top_bar.style.marginTop = target + "px";
    timerTopBar = null;
    return false;
}
top_bar.style.marginTop = mt + speed + "px";
},0)
}