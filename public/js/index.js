
//购物车
// var shopcarlist= document.getElementsByClassName("shopcarlist")[0];
// var QTYcontrolbtns = shopcarlist.getElementsByClassName("QTYcontrol")
// shopcarlist.onclick = function(e){
//     if(e.target.nodeName=="A" && (e.target.innerHTML=="+" || e.target.innerHTML=="-")){
//         var shopcarbuyQTY = e.target.parentElement.previousElementSibling;
//         if(e.target.innerHTML=="+"){
//             shopcarbuyQTY.value++;
//         }else if(shopcarbuyQTY.value>1){
//             shopcarbuyQTY.value--;
//         }
//         var thisli=e.target.parentElement.parentElement.parentElement;
//         var totalprice=thisli.getElementsByClassName("totalprice")[0];
//         totalprice.innerHTML=(parseFloat(thisli.getElementsByClassName("unitprice")[0].innerHTML)*shopcarbuyQTY.value).toFixed(2);
//         var sumprice=shopcarlist.getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
//         var totalprices=document.querySelectorAll(".shopcarlist>ul>li .totalprice");
//         var sumpriceFloat=0;
//         for(var i=0;i<totalprices.length;i++){
//             sumpriceFloat=sumpriceFloat+parseFloat(totalprices[i].innerHTML);
//         }
//         sumprice.innerHTML=sumpriceFloat.toFixed(2);
//     }
// }

// function bindaddtoshoppoingcart(){
//     var addtocartbtns=document.getElementsByClassName("addtocartbtn");
//
//     for(var i=0;i<addtocartbtns.length;i++){
//         //为每个加入购物车按钮绑定事件
//         addtocartbtns[i].onclick=function(){
//             //如果购物车里没有点击的商品则增加一个商品li到购物车
//             var addproduct=this.parentElement.parentElement;
//             //声明变量保存被点击产品的fid。
//             var addfid=this.parentElement.parentElement.getElementsByTagName("input")[0].value;
//
//             //定义价格绑定方法
//             function bingprice(){
//                 var shopcarlist= document.getElementsByClassName("shopcarlist")[0];
//                 var sumprice=shopcarlist.getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
//                 var quantity = document.querySelectorAll(".shopcarlist>ul>li>input[value='"+addfid+"']")[0].parentElement.querySelectorAll(".quantity>input")[0];
//
//
//                 var thisli=quantity.parentElement.parentElement;
//                 var shopcarbuyQTY = quantity.value;
//                 var totalprice=thisli.getElementsByClassName("totalprice")[0];
//                 totalprice.innerHTML=(parseFloat(thisli.getElementsByClassName("unitprice")[0].innerHTML)*parseInt(shopcarbuyQTY)).toFixed(2);
//
//                 var totalprices=document.querySelectorAll(".shopcarlist>ul>li .totalprice");
//                 var sumpriceFloat=0;
//                 for(var i=0;i<totalprices.length;i++){
//                     sumpriceFloat=sumpriceFloat+parseFloat(totalprices[i].innerHTML);
//                 }
//                 sumprice.innerHTML=sumpriceFloat.toFixed(2);
//             }
//
//             //定义删除按钮绑定方法
//             function delbtnbind(){
//                 var delBtns=document.querySelectorAll(".shopcarlist>ul>li>.delete");
//                 for(var i=0;i<delBtns.length;i++){
//                     delBtns[i].onclick=function (){
//                         this.parentElement.parentElement.removeChild(this.parentElement);
//                         //为删除按钮绑定价格
//                     }
//                 }
//             }
//
//             var inputs=document.querySelectorAll(".shopcarlist>ul>li>input");
//             var arr = Array.prototype.slice.call(inputs);
//             if(inputs.length>0){//判断购物车是否有产品
//                 //for(var input of inputs){
//                 if(arr.some(function(elem,i,arr){return elem.value==addfid})){//如果有相同的产品，相同产品数量+1
//                     var quantity = document.querySelectorAll(".shopcarlist>ul>li>input[value='"+addfid+"']")[0].parentElement.querySelectorAll(".quantity>input")[0];
//                     quantity.value++;
//                     //绑定价格
//                     bingprice()
//                     //绑定数量控制按钮
//                     cartcontrol()
//
//                 }else{
//                     //如果有不同的产品，新增一条产品记录
//                     var ul=document.getElementsByClassName("shopcarlist")[0].getElementsByTagName("ul")[0];
//                     var imgsrc=addproduct.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
//                     var title=addproduct.getElementsByClassName("title")[0].innerHTML;
//                     var unitprice=addproduct.getElementsByClassName("newprice")[0].textContent.slice(4);
//                     var li = document.createElement("li");
//                     li.innerHTML='<input type="hidden" value="'+addfid+'"><div class="pic"><img src="'+imgsrc+'" alt="" ></div><span class="title">'+title+'</span><div class="quantity"><input type="text" class="shopcarbuyQTY" value="1"><div class="shopcarbuyQTYcontrol"><a href="javascript:;" class="shopcarAdd QTYcontrol">+</a><a href="javascript:;" class="shopcarreduce QTYcontrol">-</a></div></div><span class="unitprice">'+unitprice+'</span><span class="totalprice">'+unitprice+'</span><a href="javascript:;" class="delete">删除</a>';
//
//                     ul.appendChild(li);
//                     //绑定价格
//                     bingprice()
//                     //绑定数量控制按钮
//                     cartcontrol()
//                 }
//                 //}
//             }else{//如果购物车里没有产品，点击加入购物车则增加一个商品li到购物车
//                 var ul=document.getElementsByClassName("shopcarlist")[0].getElementsByTagName("ul")[0];
//                 var imgsrc=addproduct.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
//                 var title=addproduct.getElementsByClassName("title")[0].innerHTML;
//                 var unitprice=parseFloat(addproduct.getElementsByClassName("newprice")[0].textContent.slice(4));
//
//                 var li='<input type="hidden" value="'+addfid+'"><div class="pic"><img src="'+imgsrc+'" alt="" ></div><span class="title">'+title+'</span><div class="quantity"><input type="text" class="shopcarbuyQTY" value="1"><div class="shopcarbuyQTYcontrol"><a href="javascript:;" class="shopcarAdd QTYcontrol">+</a><a href="javascript:;" class="shopcarreduce QTYcontrol">-</a></div></div><span class="unitprice">'+unitprice.toFixed(2)+'</span><span class="totalprice">'+unitprice.toFixed(2)+'</span><a href="javascript:;" class="delete">删除</a>';
//
//                 ul.innerHTML='<li>'+li+'</li>';
//                 var sumprice=document.getElementsByClassName("shopcarlist")[0].getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
//                 sumprice.innerHTML=unitprice.toFixed(2);
//                 cartcontrol();
//             }
//             //绑定删除按钮
//             delbtnbind()
//         }
//     }
//
// }



var carousel=document.getElementsByClassName("carousel")[0]
var timer=setInterval(function(){
    var showli=carousel.getElementsByClassName("show")[0];
    if(showli.nextElementSibling!=null){
        showli.className="";
        showli.nextElementSibling.className="show";
    }else{
        showli.className="";
        carousel.firstElementChild.className="show";
    }

},4000)


function getlist(){
    function normallist(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function (){
            if(xhr.readyState==4 && xhr.status==200){
                //console.log(1111);
                var result=JSON.parse(xhr.responseText);
                //console.log(result);
                var listr='';
                for(var i=0;i<result.length;i++){
                    listr+='<li><div class="clock"><p>限时抢购</p><img src="image/clock.png"></div><a href="product_detail.html?fid='+result[i].fId+'"><img class="npimg" src="'+result[i].spic+'"></a><p class="title">'+result[i].title+'</p><p class="fdesc">'+result[i].fdesc+'</p><p class="timer">'+'02小时35分26秒'+'</p><p class="price"><span class="nPrice">￥'+result[i].nUnitPrice.toFixed(2)+'</span><span class="packWeight">'+result[i].packWeight+'斤</span><span class="oPrice">原价:'+result[i].oUnitPrice+'</span></p><p class="dealCount">300人已购买</p><div class="buyBtn"><a href="product_detail.html?fid='+result[i].fId+'">立即抢购</a></div></li>'
                }
                var ul=document.createElement('ul');
                ul.innerHTML=listr;
                var normalp = document.getElementsByClassName("normalp")[0];
                normalp.appendChild(ul);


                var timers=document.getElementsByClassName("timer");
                function timer(obj){
                    //var that=this;
                    var clock=setInterval(function(){
                        var end=new Date("2019/12/30 18:00:00");
                        var now=new Date();
                        var s=parseInt((end-now)/1000);
                        var d=parseInt(s/3600/24);
                        if(d<10) d="0"+d;
                        //s/3600/24,再下取整
                        var h=parseInt(s%(3600*24)/3600);
                        if(h<10) h="0"+h;
                        //s/(3600*24)的余数,再/3600,再下去整
                        var m=parseInt(s%3600/60);
                        if(m<10) m="0"+m;
                        //s/3600的余数,再/60，再下取整
                        s%=60;//s/60的余数
                        if(s<10) s="0"+s;

                        obj.innerHTML= d+"天"+h+"小时"+m+"分"+s+"秒";
                    },1000);
                }
                for(var i=0;i<timers.length;i++){
                    timer(timers[i]);
                }
            }
        }
        xhr.open('get','/product/normallist',true);
        xhr.send(null);
    }

    function Onsalelist(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function (){
            if(xhr.readyState==4 && xhr.status==200){
                var result=JSON.parse(xhr.responseText);
                var listr1='';
                for(var i=0;i<result.length/2;i++){
                    listr1+='<li><a href="product_detail.html?fid='+result[i].fId+'"><img src="'+result[i].spic+'"></a><p class="name">'+result[i].pName+'</p><p class="price"><span class="nPrice">￥'+result[i].nUnitPrice.toFixed(2)+'</span><span class="packWeight">'+result[i].packWeight+'斤</span></p><div><p class="oPrice">原价 : '+result[i].oUnitPrice+'</p><a href="product_detail.html?fid='+result[i].fId+'" class="Onsalebuybtn">立即购买</a></div></li>'
                }
                var ul1=document.createElement('ul');
                var Onsalep=document.getElementsByClassName("Onsalep")[0];
                ul1.innerHTML=listr1;
                Onsalep.appendChild(ul1);
                var listr2=''
                for(var i=result.length/2;i<result.length;i++){
                    listr2+='<li><a href="product_detail.html?fid='+result[i].fId+'"><img src="'+result[i].spic+'"></a><p class="name">'+result[i].pName+'</p><p class="price"><span class="nPrice">￥'+result[i].nUnitPrice.toFixed(2)+'</span><span class="packWeight">'+result[i].packWeight+'斤</span></p><div><span class="oPrice">原价:'+result[i].oUnitPrice+'</span><a href="product_detail.html?fid='+result[i].fId+'" class="Onsalebuybtn">立即购买</a></div></li>'
                }
                var ul2=document.createElement('ul');
                ul2.innerHTML=listr2;
                Onsalep.appendChild(ul2);

            }
        }
        xhr.open('get','/product/Onsalelist',true);
        xhr.send(null);
    }

    function giftBasketlist(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function (){
            if(xhr.readyState==4 && xhr.status==200){
                var result=xhr.responseText;
                //console.log(result);
            }
        }
        xhr.open('get','/product/giftBasketlist',true);
        xhr.send(null);
    }
    normallist();
    Onsalelist();
    giftBasketlist();
    // bindaddtoshoppoingcart();
}
