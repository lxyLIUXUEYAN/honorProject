$(function () {
    $.ajax("../data/honor-active-newYear.json",{
        dataType:"json"
    }).then(render);

    function render(res) {
        var newYear = res.newYearPro;
        var html = template("new-year",{list : newYear});
        // console.log(newYear);
        $(".pro-list-main").html(html);
    }
});


$.ajax("../data/honor-active-family.json",{
    dataType:"json"
}).then(render);

function render(res) {
    var family = res.familyPro;
    var html = template("family",{list : family});
    $(".family-pro-list").html(html);
}




//思路：页面加载  定时器控制每个xx时间改变 box的top值  --
// 当top变到 -一个ul的height时       将top值重新编程 0
var box = document.getElementById("box");
var listH = document.getElementById("list").offsetHeight;
console.log(listH);
var num = 0;//用num记录着box的top值，刚开始top值为0
function autoMove(){
    num--;
    box.style.top = num + "px";
    if(num < -listH){
        num = 0;
    }
}
setInterval(autoMove,60);


