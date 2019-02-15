var custom_values = ["￥0","￥500","￥1000","￥1500","￥2000","￥2500","￥3000"]
$(document).ready(function () {
    var $range = $("#range_44"),
        $result = $("#result_44");

    var track = function (data) {
        delete data.input;
        delete data.slider;
        if (JSON) {
            $result.html(JSON.stringify(data, null, 2));
        } else {
            $result.html(data.toString());
        }
    };

    $range.ionRangeSlider({
        type: "dounle",
        min: 0,
        max: 3000 ,
        from: 0,
        to: 3000,
        step: 0,
        grid: true,
        grid_snap: false,
        values : custom_values,
        drag_interval:false,
        onStart: track,
        onChange: track,
        onFinish: track,
        onUpdate: track
    });
});