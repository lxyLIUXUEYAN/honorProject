
$(function () {
    $.ajax("../data/index.json",{
        dataType:"json"
    }).then(render);

    function render(res) {
        var headNav = res.navList;
        var html = template("header-two-nav",{list : headNav});
        // console.log(headNav);
        $(".drop-down-list_left").html(html);
    }
});

$.ajax("../data/index-project.json",{
    dataType: "json"
}).then(render);

function render(res) {
    var prohectList = res.projectList;
    var html = template("project-list",{list:prohectList});
    $(".rec_main").html(html);
}


$(".rec_main").on("click","dl",function () {
    location.href = "http://localhost:8888/html/shopList.html"
})

$("#swiper-container1").click(function () {
    window.location.href = "http://localhost:8888/html/honor-active.html"
})