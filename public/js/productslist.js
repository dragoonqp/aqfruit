$(function(){
    if(location.search.split("=")[0].indexOf("kwords")!=-1) {
        var kwords = decodeURI(location.search.split("=")[1])
        console.log(kwords)
        $.ajax({
            url: "/product/search",
            type: "get",
            dataType: "json",
            data: {kwords: kwords},
            success: function (result) {
                console.log(result);
            }
        })
    }
})

$(".sort").on("click","a",function(){
    var urlParams = new URLSearchParams(location.search);
    var pclassname = urlParams.get('classname');
    if(urlParams.get('sortby')==null || urlParams.get('sortby').split("_")[1]=="DESC"){
        var sort="ASC";
    }else{
        var sort="DESC";
    }
    var toUrl = `/products_list.html?classname=${pclassname}&sortby=${$(this).attr("data-target")}_${sort}`;
    location.assign(toUrl);
})


// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange=function (){
// 	if(xhr.readyState==4 && xhr.status==200){
// 		var result = xhr.responseText;
// 		console.log(result);
// 	}
// }
// xhr.open("get","/product/productlist?classname="+pclassname,true);
// xhr.send(null);

//定义函数将激活的li前后各2个及自身类名添加.show
function showact(){
    var pageselectordiv=document.getElementsByClassName("pageselectordiv")[0];
    var liList=pageselectordiv.getElementsByTagName("a");
    if(liList){
        for(var i=0;i<liList.length;i++){
            liList[i].parentElement.classList.remove('show');
        }
    }
    if(liList.length>=7){
        //var lilist=document.getElementsByTagName('li');
        var actLi=document.getElementsByClassName("active")[0];
        var actId=Number(actLi.innerHTML);
        if(actId>=3&&actId<=liList.length-4){
            for(var j=actId-2;j<=actId+2;j++){
                //console.log(document.getElementById('l'+j));
                document.getElementById('l'+j).parentElement.classList.add('show');
            }
        }else if(actId==2){
            for(var j=actId-1;j<=actId+2;j++){
                document.getElementById('l'+j).parentElement.classList.add('show');
            }
        }else if(actId==liList.length-2){
            for(var j=actId-2;j<=actId;j++){
                document.getElementById('l'+j).parentElement.classList.add('show');
            }
        }else if(actId==liList.length-3){
            for(var j=actId-2;j<=actId+1;j++){
                document.getElementById('l'+j).parentElement.classList.add('show');
            }
        }else if(actId==1){
            //console.log(11);
            for(var j=actId;j<=actId+2;j++){
                document.getElementById('l'+j).parentElement.classList.add('show');
            }
        }
    }else{
        for(var k=1;k<liList.length-1;k++){
            liList[k].parentElement.classList.add('show');
        }
    }
}
//定义act方法改变激活的li的样式
function act(num1){
    //获取插入的ul及li，为li添加和删除类名来改变样式。
    var div1 = document.getElementsByClassName('pageselectordiv')[0];
    var cli = document.getElementById('l'+num1);
    //console.log(div);
    var ul = div1.getElementsByTagName('ul')[0];
    var li = ul.getElementsByTagName('a');
    for(var i=0;i<li.length;i++){
        li[i].classList.remove('active');
    }
    cli.classList.add('active');
}
//定义禁用上一页和下一页
function disbtn() {
    var div=document.getElementsByClassName('pageselectordiv')[0];
    var ul=div.getElementsByTagName("ul")[0];
    var li=ul.getElementsByTagName("a");
    var prev=ul.firstElementChild.firstElementChild;
    var next=ul.lastElementChild.firstElementChild;
    if(document.getElementsByClassName("disabled")[0]){
        document.getElementsByClassName("disabled")[0].classList.remove('disabled');
    }

    var currentId=Number(div.getElementsByClassName("active")[0].innerHTML);
    if(currentId==1){
        prev.classList.add('disabled')
    }
    if(currentId==Number(li[li.length-2].innerHTML)){
        next.classList.add('disabled')
    }
}

//定义改变页码li时的函数
function changePage(num){
    var urlParams = new URLSearchParams(location.search);
    var pclassname = urlParams.get('classname');
    var sort =urlParams.get('sortby');
    var pageCount=15;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function (){
        if(xhr.readyState==4 && xhr.status==200){
            var result = JSON.parse(xhr.responseText);
            //遍历result对象数组里的元素，拼接到待插入的节点里。
            // var str = '';
            // for(var i=0;i<result.length-1;i++){
            //     str+='<tr><td>'+result[i].uid+'</td><td>'+result[i].uname+'</td><td>'+result[i].email+'</td><td>'+result[i].phone+'</td><td>'+result[i].userName+'</td><td>'+result[i].gender+'</td><td>'+result[i].avatar+'</td><td>'+result[i].isOnline+'</td><td><a href="javascript:detail('+result[i].uid+')">详情</a>&nbsp;&nbsp;<a href="user_edit.html?uid='+result[i].uid+'">编辑</a>&nbsp;&nbsp;<a href="javascript:del('+result[i].uid+')">删除</a></td><tr>'
            // }
            // userTable.innerHTML=str;

            var pListdiv=document.getElementsByClassName("pListdiv")[0];
            var lis = '';
            for(var i=0;i<result.length-1;i++){
                var fid=result[i].fId;
                var imgscr=result[i].spic;
                var ptitle=result[i].title;
                var poldprice=result[i].oUnitPrice;
                var pnewprice=result[i].nUnitPrice;
                lis+='<li style="margin-left:'+((i+1)%5==1?"0px":"")+';"><div><input class="fid" type="hidden" value="'+fid+'"><a href="product_detail.html?fid='+fid+'" ><img src="'+imgscr+'" alt=""></a><p class="title">'+ptitle+'</p><p class="oldprice"><span>原价:</span>￥'+poldprice+'</p><p class="newprice"><span>现价:</span>￥'+pnewprice+'</p><div class="buybtn"><a href="" class="addtocartbtn">加入购物车</a><a href="product_detail.html?fid='+fid+'" class="buynowbtn">立即购买</a></div></div></li>'
            }
            pListdiv.innerHTML='<ul>'+lis+'</ul>'
        }
    }
    xhr.open('get','/product/productlist?classname='+pclassname+'&sortby='+sort+'&pageNo='+num+"&QPP="+pageCount,true);
    xhr.send(null);
    //激活编号为num的li。
    act(num);
    //将激活的li前后各2个及自身类名添加.show
    showact()
    //改变active的li时，判断是否是最后和最前面的li，如果是则让按钮禁用
    disbtn();
}

//定义点击上一页和下一页的改变有类名active的li,并执行changePage函数的函数。
function movepage(n){
    var div=document.getElementsByClassName('pageselectordiv')[0];
    var ul=div.getElementsByTagName("ul")[0];
    var li=ul.getElementsByTagName("a")
    var prev=ul.firstElementChild.firstElementChild;
    var next=ul.lastElementChild.firstElementChild;
    if(document.getElementsByClassName("disabled")[0]){
        document.getElementsByClassName("disabled")[0].classList.remove('disabled');
    }

    var currentId=Number(document.getElementsByClassName("active")[0].innerHTML);
    if(currentId==1){
        prev.classList.add('disabled')
    }
    if(currentId==Number(li[li.length-2].innerHTML)){
        next.classList.add('disabled')
    }
    var newActiveLi=document.getElementById('l'+(currentId+n));
    changePage(currentId+n);
    document.getElementsByClassName("active")[0].classList.remove('active');
    newActiveLi.classList.add('active');
}
//定义根据页面数量插入对应数量的列表元素。
function insertLi(num){
    var pageselectordiv=document.getElementsByClassName("pageselectordiv")[0];
    pageselectordiv.innerHTML='';
    function fun(num){
        var ul = document.createElement('ul');
        for(var i=0;i<num;i++){
            ul.innerHTML+='<li><a id="l'+(i+1)+'" href="javascript:changePage('+(i+1)+')">'+(i+1)+'</a></li>';
        }
        ul.innerHTML='<li class="show"><a id="prev" class="prev" href="javascript:movepage(-1)">上一页</a></li>'+ul.innerHTML+'<li class="show" ><a id="next" class="next" href="javascript:movepage(1)">下一页</a></li>'
        pageselectordiv.appendChild(ul);
    }
    fun(num);
}

function tabicon(){
    var urlParams= new URLSearchParams(location.search);
    var sortby=urlParams.get("sortby");
    if(sortby!=null) {
        var sort = sortby.split("_")[0];
        var by = sortby.split("_")[1];
        $(".sort i").removeClass();
        $(".sort a[data-target="+sort+"]").children("i").addClass("icon iconfont icon-"+by);
    }else{
        return
    }
}

//定义函数改变每页显示的数量
function initialize(){
    //获取地址栏的查询字符串并连接后台获取数据
    var urlParams = new URLSearchParams(location.search);
    var pclassname = urlParams.get('classname');
    var sort =urlParams.get('sortby');
    console.log(sort)
    var pageno=1;
    var pageCt;
    var pageCount=15;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function (){
        if(xhr.readyState==4 && xhr.status==200){
            var result = JSON.parse(xhr.responseText);
            var pListdiv=document.getElementsByClassName("pListdiv")[0];
            var lis = '';
            for(var i=0;i<result.length-1;i++){
                var fid=result[i].fId;
                var imgscr=result[i].spic;
                var ptitle=result[i].title;
                var poldprice=result[i].oUnitPrice;
                var pnewprice=result[i].nUnitPrice;
                lis+='<li style="margin-left:'+((i+1)%5==1?"0px":"")+';"><div><input class="fid" type="hidden" value="'+fid+'"><a href="product_detail.html?fid='+fid+'" ><img src="'+imgscr+'" alt=""></a><p class="title">'+ptitle+'</p><p class="oldprice"><span>原价:</span>￥'+poldprice+'</p><p class="newprice"><span>现价:</span>￥'+pnewprice+'</p><div class="buybtn"><a href="javascript:;" class="addtocartbtn">加入购物车</a><a href="product_detail.html?fid='+fid+'" class="buynowbtn">立即购买</a></div></div></li>'
            }
            pListdiv.innerHTML='<ul>'+lis+'</ul>'
            pageCt=Math.ceil(result[result.length-1].tCount/pageCount);
            insertLi(pageCt);
            act(1);
            showact();
            disbtn();
            //bindaddtoshoppoingcart();
            //cartcontrol();
            addtoshopcart();
            tabicon()
        }
    }
    xhr.open('get','/product/productlist?classname='+pclassname+'&sortby='+sort+'&pageNo='+pageno+"&QPP="+pageCount,true);
    xhr.send(null);
}
initialize()
