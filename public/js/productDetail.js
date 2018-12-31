
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
                        alert("加入购物车成功");
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
                        lis+="<li><div class='cmtmain'><div class='cmtcontent'>"+result[i].content+"</div><p class='cmtTime'>"+newDateTime+"</p></div><div class='score'>"+score+"</div><div class='cmtuser'><div class='avatar'><img src="+result[i].avatar+"></div><div class='uname'>"+result[i].uname+"</div></div></div></li>"
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
                insertPagination(pagination,pageQTY)
            }
        })
    }
    function submitComment(){
        $(".submitcomment .submitbtn").click(function(){
            var uid=1;
            var score=$(".submitcomment .star i[style='color: orange;']").length;
            var cmtContent=$(".submitcomment textarea").val();
            var urlParams= new URLSearchParams(location.search);
            var fid=urlParams.get("fid");
            if(cmtContent.trim().length>5) {
                $.ajax({
                    url: "/product/addComments",
                    type: "post",
                    data: {uid,fid, score, cmtContent},
                    dataType: "json",
                    success: function (result) {
                        if(result.code==201){
                            $(".submitcomment textarea").val("");
                            alert("评论提交成功")
                        }
                    }
                })
            }else{
                alert("评论至少包含非空白字符5位以上")
            }
        })
    }

    addtoshopcart();
    getComments(1);
    insertpage();
    submitComment();


