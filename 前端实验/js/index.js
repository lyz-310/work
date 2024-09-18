
$(function () {
    //1.点击上部li  给当前li添加current类 其余兄弟移除current类
    $("li").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        //2.点击的同时得到当前li的索引号
        var index = $(this).index();
        console.log(index);
        //3.让下面相对应的item显示  其余隐藏
        $(".tab_con .item").eq(index).show().siblings().hide();
    });


})
