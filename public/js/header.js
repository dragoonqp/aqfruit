function linkToMCenter(){
    console.log(111)
    $.ajax({
        url:"/user/linkToMCenter",
        type:"get",
        dataType:"json",
        success:function(result){
            if(result.code==201){
                location.assign("../membercenter.html")
            }else if(result.code==301 || result.code==302){
                alert(result.msg)
                location.assign("../user_login.html")
            }
        }
    })
}
function logout(){
    $.ajax({
        url:"/user//logout",
        type:"get",
        dataType:"json",
        success:function(result){
            if(result.code==501){
                var login="<li><a href='user_login.html' title='登录账户'>[登录]</a>&nbsp;</li>";
                var register="<li><a href='user_register.html' title='注册新用户'>[注册有惊喜]</a></li>";
                alert("退出成功")
                $(".mycenter li:first-child").replaceWith(login);
                $(".mycenter li:nth-child(2)").replaceWith(register);
            }else{
            }
        }
    })
}
$(function(){
    $.ajax({
        url:"../header.html",
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

            var cities=[
                [{"name":'东城区',"value":101},
                    {"name":'西城区',"value":102},
                    {"name":'海淀区',"value":103},
                    {"name":'朝阳区',"value":104}],
                [{"name":'河东区',"value":201},
                    {"name":'河西区',"value":202},
                    {"name":'南开区',"value":303}],
                [{"name":'石家庄市',"value":301},
                    {"name":'廊坊市',"value":302},
                    {"name":'保定市',"value":303},
                    {"name":'唐山市',"value":304},
                    {"name":'秦皇岛市',"value":304}],
                [{"name":"广州","value":401},
                    {"name":"深圳","value":402},
                    {"name":"潮汕","value":403},
                    {"name":"虎门","value":404},]
            ];
            $("#delProv").change(function(){
                var i=$("#delProv option:selected").index();
                if(i>0){
                    $("#delCity").css("display","inline-block");
                    var selProv=cities[i-1];
                    var options="<option>--请选择--</option>"
                    for(var j=0;j<cities[i-1].length;j++){
                        options+="<option value='"+cities[i-1][j].value+"'>"+cities[i-1][j].name+"</option>"
                    }
                    $("#delCity").html(options);
                }else{
                    var options="--请选择--"
                    $("#delCity").html(options);
                    $("#delCity").css("display","none");
                }
            })
        }
    });
    $.ajax({
        url:"/user/linkToMCenter",
        type:"get",
        dataType:"json",
        success:function(result){
            if(result.code==201){
                var uname=result.data[0].uname;
                var mcenter="<li><span><a href='../membercenter.html'>"+uname+"</a></span></li>";
                var logout="<li><span><a href='javascript:logout()'>[退出登录]</a></span></li>";
                $(".mycenter li:first-child").replaceWith(mcenter)
                $(".mycenter li:nth-child(2)").replaceWith(logout)
            }else{
                return
            }
        }
    })
})


