
    function addtoshopcart(){
        $(".buybtn .addtocar").click(function (){
            var uid=1;
            var urlParams= new URLSearchParams(location.search);
            var fid=urlParams.get("fid");
            var qty=$(".countcontrol input.buycounttext").val();
            var reg=/^\d+$/;
            if(reg.test(qty)) {
                $.ajax({
                    url: "/shopcart/detailadd",
                    type: "post",
                    data: {uid, fid, qty},
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        if(result.code==201){
                            alert("加入购物车成功");
                            updateshopcart(result.data)
                        }else if(result.code==301){
                            alert("请登陆")
                        }
                    }
                })
            }
        })
    }
    function getComments(cpno){
        var urlParams= new URLSearchParams(location.search);
        var fid=urlParams.get("fid");
        var QPP=4;
        if(parseInt(cpno)>0){
            $.ajax({
                url:"/product/getComments",
                type:"get",
                data:{fid,QPP,cpno},
                dataType:"json",
                success:function(result){
                    $("#comment .commentlist").html("");
                    var lis="";
                    for(var i=0;i<result.length;i++){
                        var score="";
                        var dateTime=new Date(result[i].cTime);
                        var y=dateTime.getFullYear();
                        var m=dateTime.getMonth()+1;
                        if(m<10) m="0"+m;
                        var d=dateTime.getDate();
                        if(d<10) d="0"+d;
                        var h=dateTime.getHours();
                        if(h<10) h="0"+h;
                        var mi=dateTime.getMinutes();
                        if(mi<10) mi="0"+mi;
                        var s=dateTime.getSeconds();
                        if(s<10) s="0"+s;
                        var newDateTime=`${y}-${m}-${d} ${h}:${mi}:${s}`;
                        for(var j=0;j<result[i].score;j++){
                            score+="<i class='iconfont icon-star'></i>";
                        }
                        lis+="<li><div class='cmtmain'><p>第"+(i+1)+"楼</p><div class='cmtcontent'>"+result[i].content+"</div><p class='cmtTime'>"+newDateTime+"</p></div><div class='score'>"+score+"</div><div class='cmtuser'><div class='avatar'><img src="+result[i].avatar+"></div><div class='uname'>"+result[i].uname+"</div></div></div></li>"
                    }
                    $("#comment .commentlist").html(lis);
                }
            })
        }
    }
    function insertpage() {
        var urlParams= new URLSearchParams(location.search);
        var fid=urlParams.get("fid");
        $.ajax({
            url:"/product/getCommentsQTY",
            type:"get",
            data:{fid},
            dataType:"json",
            success:function(result){
                var pageQTY=Math.ceil(result[0].CommentsQTY/4);
                var pagination=$("#comment .commentpage")[0];
                if(pageQTY>0){
                    insertPagination(pagination,pageQTY)
                }else{
                    var nocmt="<div class='nocmt'>暂无评论</div>"
                    $(".commentlist").html(nocmt);
                }
            }
        })
    }
    function submitComment(){
        $(".submitcomment .submitbtn").click(function(){
            var uid=1;
            var score=$(".submitcomment .star i[style='color: orange;']").length;
            if(score==0){
                alert("请评分!")
            }else {
                var cmtContent = $(".submitcomment textarea").val();
                var urlParams = new URLSearchParams(location.search);
                var fid = urlParams.get("fid");
                if (cmtContent.trim().length > 5) {
                    $.ajax({
                        url: "/product/addComments",
                        type: "post",
                        data: {uid, fid, score, cmtContent},
                        dataType: "json",
                        success: function (result) {
                            if (result.code == 201) {
                                $(".submitcomment textarea").val("");
                                alert("评论提交成功");
                                getComments(1);
                            }else if(result.code==301){
                                alert("请先登陆")
                            }
                        }
                    })
                } else {
                    alert("评论至少包含非空白字符5位以上")
                }
            }
        })
    }

    addtoshopcart();
    getComments(1);
    insertpage();
    submitComment();


