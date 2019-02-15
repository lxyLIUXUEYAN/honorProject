window.onload = function () {
    var mySwiper1 = new Swiper ('#swiper-container1', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay : true,
        pagination: {
            el: '.swiper-pagination',
            renderBullet: function (className) {
                return '<span class="' + "swiper-pagination-bullet" + '">' + `<a></a>` + '</span>';
            }
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect : 'slide',

    })
}



