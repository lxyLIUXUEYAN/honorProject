// console.log($(".product_ul"));
// $(".product_ul").click(function () {
    // console.log($(this).bind());
    // $(".choose ul:visible").css("display", "none");

// })

// $(".product_ul").on("click",function () {
//     if($(this).bind().children("ul:hidden")){
//         console.log($(this).children("ul").css("display"));
//         console.log($(this).children("ul").css("diplay") !== "block");
//         $(this).children("ul").css("display", "block");
//     }else{
//         $(this).children("ul").css("display", "none");
//     }
// })

$(".product_ul").click(function () {
    $(this).children("ul").toggle();
})
//
// $(".product_ul ul li").mouseover(function () {
//     $(this).css("background","#00b3e0")
// })