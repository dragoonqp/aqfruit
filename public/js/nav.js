//购物车
// function cartcontrol(){
//     var shopcarlist= document.getElementsByClassName("shopcarlist")[0];
//     var QTYcontrolbtns = shopcarlist.getElementsByClassName("QTYcontrol");
//     for(var j=0;j<QTYcontrolbtns.length;j++){
//         QTYcontrolbtns[j].onclick = function(){
//             var shopcarbuyQTY = this.parentElement.previousElementSibling;
//             if(this.innerHTML=="+"){
//                 shopcarbuyQTY.value++;
//             }else if(shopcarbuyQTY.value>1){
//                 shopcarbuyQTY.value--;
//             }
//             var thisli=this.parentElement.parentElement.parentElement;
//             var totalprice=thisli.getElementsByClassName("totalprice")[0];
//             totalprice.innerHTML=(parseFloat(thisli.getElementsByClassName("unitprice")[0].innerHTML)*shopcarbuyQTY.value).toFixed(2);
//             var sumprice=shopcarlist.getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
//             var totalprices=document.querySelectorAll(".shopcarlist>ul>li .totalprice");
//             var sumpriceFloat=0;
//             for(var i=0;i<totalprices.length;i++){
//                 sumpriceFloat=sumpriceFloat+parseFloat(totalprices[i].innerHTML);
//             }
//             sumprice.innerHTML=sumpriceFloat.toFixed(2);
//         }
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
function getTotalPrice(){
        var subtotals=$("input[type=checkbox]:checked").parent().children("ul .totalprice");
        var arrSubTotals=[].slice.call(subtotals);
        var totalPrice=arrSubTotals.reduce(function(prev,elem,i,arr){
            return prev+parseFloat(elem.innerHTML);
        },0)
        $(".sumprice span").html(totalPrice.toFixed(2));
}

function updateshopcart(result){
    var lis=""
    $(".shopcarlist>ul").html("");
    for(var i=0;i<result.length;i++){
        var totalprice=result[i].nUnitPrice*result[i].count;
        lis+="<li><input type='checkbox' class='shopcartcheckbox' checked><input type='hidden' class='fid' value="+result[i].productId+"><div class='pic'><img src="+result[i].spic +"></div><span class='title'>"+result[i].title+"</span><div class='quantity'><input type='text' class='shopcarbuyQTY' value="+result[i].count+"><div class='shopcarbuyQTYcontrol'><a href='javascript:;' class='shopcarAdd QTYcontrol'>+</a><a href='javascript:;' class='shopcarreduce QTYcontrol'>-</a></div></div><span class='unitprice'>"+result[i].nUnitPrice.toFixed(2)+"</span><span class='totalprice'>"+totalprice.toFixed(2)+"</span><a href='javascript:;' class='delete'>删除</a></li>"
    }
    $(".shopcarlist>ul").html(lis);
    checked();
    getTotalPrice();
    shownone();
}

function addtoshopcart(){
    $(".pListdiv").on("click","a.addtocartbtn",function (){
        var uid=1;
        var $li=$(this).parent().parent().parent();
        var fid=$li.children("div").children(".fid").val()
        $.ajax({
            url:"/shopcart/add",
            type:"post",
            data:{fid,uid},
            datatype:"json",
            success:function (result) {
                updateshopcart(result)

            }
        })
    })
}

function shownone(){
    var liLength=$(".shopcarlist>ul>li").length;
    if(liLength==0){
        $(".shopcarlist div.nonePro").css("display","flex");
    }else{
        $(".shopcarlist div.nonePro").css("display","none");
    }
}

function countchange(){
    var uid=1;
    $(".shopcarlist").on("click","a.QTYcontrol",function(){
        if($(this).html()=="+"){
            var num=1;
        }else if($(this).html()=="-"){
            var num=-1;
        }
        var fid=$(this).parent().parent().parent().children("input")[1].value;
        $.ajax({
            url:"/shopcart/countchange",
            type:"post",
            data:{uid,fid,num},
            datatype:"json",
            success:function(result){

                updateshopcart(result)

            }
        })
    })
}

function initshopcart(){
    var uid=1;
    $.ajax({
        url:"/shopcart/init",
        type:"post",
        data:{uid},
        datatype:"json",
        success:function(result){
            updateshopcart(result);
        }
    })
}

function checked(){
    $(".shopcartcheckbox").change(function(){
        getTotalPrice()
    })
}

function clearShopcart(){
    $(".clearshopcar").click(function(){
        var uid=1;
        $.ajax({
            url:"/shopcart/clear",
            type:"post",
            data:{uid},
            datatype:"json",
            success:function(result){
                if(result.code==201){
                    $(".shopcarlist>ul").html("");
                    getTotalPrice()
                    shownone();
                }
            }
        })
    })
}

function countEdit(){
    $(".shopcarlist").on("input propertychange","input.shopcarbuyQTY",function(){
        var uid=1;
        var fid=$(this).parent().parent().children("input.fid")[0].value;
        var reg=/^\d+$/;
        var quantity=parseInt($(this).val());
        if(reg.test(quantity)){
            $.ajax({
                url:"/shopcart/countchange",
                type:"post",
                data:{uid,fid,quantity},
                datatype:"json",
                success:function(result){
                    console.log(result)
                    if(result.code==201){
                        $(this)[0].value=quantity;
                    }

                }
            })
        }else{
            return
        }
    })
}

function deleteItem(){
    $(".shopcarlist").on("click","a.delete",function(){
        var uid=1;
        var fid=$(this).parent().children("input.fid")[0].value;
        $.ajax({
            url:"/shopcart/deleteItem",
            type:"post",
            data:{uid,fid},
            datatype:"json",
            success:function(result){
                if(result.code==201) {
                    $(".shopcarlist>ul>li>input.fid[value=" + fid + "]").parent().remove()
                }
                getTotalPrice()
            }
        })
    })
}

$(function(){
    $.ajax({
        url:"../nav.html",
        type:"get",
        success:function(result){
            $(result).replaceAll("#mainnav");

            countchange();
            initshopcart();
            checked();
            clearShopcart();
            shownone();
            countEdit();
            deleteItem()

            //购物车
            // var shopcarlist= document.getElementsByClassName("shopcarlist")[0];
            // var QTYcontrolbtns = shopcarlist.getElementsByClassName("QTYcontrol")
            // shopcarlist.onclick = function(e){
            //     if(e.target.nodeName=="A" && (e.target.innerHTML=="+" || e.target.innerHTML=="-")){
            //         var shopcarbuyQTY = e.target.parentElement.previousElementSibling;
            //         if(e.target.innerHTML=="+"){
            //             console.log(111)
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

            //购物车
            // function cartcontrol(){
            //     var shopcarlist= document.getElementsByClassName("shopcarlist")[0];
            //     var QTYcontrolbtns = shopcarlist.getElementsByClassName("QTYcontrol");
            //     for(var j=0;j<QTYcontrolbtns.length;j++){
            //         QTYcontrolbtns[j].onclick = function(){
            //             var shopcarbuyQTY = this.parentElement.previousElementSibling;
            //             if(this.innerHTML=="+"){
            //                 shopcarbuyQTY.value++;
            //             }else if(shopcarbuyQTY.value>1){
            //                 shopcarbuyQTY.value--;
            //             }
            //             var thisli=this.parentElement.parentElement.parentElement;
            //             var totalprice=thisli.getElementsByClassName("totalprice")[0];
            //             totalprice.innerHTML=(parseFloat(thisli.getElementsByClassName("unitprice")[0].innerHTML)*shopcarbuyQTY.value).toFixed(2);
            //             var sumprice=shopcarlist.getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
            //             var totalprices=document.querySelectorAll(".shopcarlist>ul>li .totalprice");
            //             var sumpriceFloat=0;
            //             for(var i=0;i<totalprices.length;i++){
            //                 sumpriceFloat=sumpriceFloat+parseFloat(totalprices[i].innerHTML);
            //             }
            //             sumprice.innerHTML=sumpriceFloat.toFixed(2);
            //         }
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
            //bindaddtoshoppoingcart();
            //addtoshopcart()
        }
    });
})
