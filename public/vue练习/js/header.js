$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/header.html",
        type:"get",
        success:function(result){
            $("<link rel='stylesheet' href='../css/common.css'>").appendTo("head");
            $(result).replaceAll("#mainheader");

            //回顶部特效及title固定
            var backtotop=document.getElementsByClassName("backToTop")[0];
            window.addEventListener("scroll",function (){
                var title=document.body.getElementsByClassName("title")[0];
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if(scrollTop>562){
                    backtotop.style.display="block";
                }else{
                    backtotop.style.display="none";
                }
                if(scrollTop>60){
                    title.style.position="fixed";

                }else{
                    title.style.position="static";
                }
            })
            backtotop.onclick=function (){
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                var timer=setInterval(function(){
                    if(scrollTop>0){
                        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                        document.documentElement.scrollTop =window.pageYOffset =document.body.scrollTop=scrollTop-30
                    }else{
                        clearInterval(timer);
                    }
                },2);
            }

            //搜索功能
            $("#searchBtn").click(function(){
                if($(this).next().val().trim().length>0) {
                    var kwords = $(this).next().val();
                    location.href="products_list.html?kwords="+kwords;
                }
            })

            if(location.search.split("=")[0].indexOf("kwords")!=-1){
                $("#searchBtn").next().val(
                    decodeURI(location.search.split("=")[1])
                )
            }
        }
    });
})


