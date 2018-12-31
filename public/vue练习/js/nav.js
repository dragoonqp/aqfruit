//购物车
function cartcontrol(){
    var shopcarlist= document.getElementsByClassName("shopcarlist")[0];
    var QTYcontrolbtns = shopcarlist.getElementsByClassName("QTYcontrol");
    for(var j=0;j<QTYcontrolbtns.length;j++){
        QTYcontrolbtns[j].onclick = function(){
            var shopcarbuyQTY = this.parentElement.previousElementSibling;
            if(this.innerHTML=="+"){
                shopcarbuyQTY.value++;
            }else if(shopcarbuyQTY.value>1){
                shopcarbuyQTY.value--;
            }
            var thisli=this.parentElement.parentElement.parentElement;
            var totalprice=thisli.getElementsByClassName("totalprice")[0];
            totalprice.innerHTML=(parseFloat(thisli.getElementsByClassName("unitprice")[0].innerHTML)*shopcarbuyQTY.value).toFixed(2);
            var sumprice=shopcarlist.getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
            var totalprices=document.querySelectorAll(".shopcarlist>ul>li .totalprice");
            var sumpriceFloat=0;
            for(var i=0;i<totalprices.length;i++){
                sumpriceFloat=sumpriceFloat+parseFloat(totalprices[i].innerHTML);
            }
            sumprice.innerHTML=sumpriceFloat.toFixed(2);
        }
    }
}
function bindaddtoshoppoingcart(){
    var addtocartbtns=document.getElementsByClassName("addtocartbtn");

    for(var i=0;i<addtocartbtns.length;i++){
        //为每个加入购物车按钮绑定事件
        addtocartbtns[i].onclick=function(){
            //如果购物车里没有点击的商品则增加一个商品li到购物车
            var addproduct=this.parentElement.parentElement;
            //声明变量保存被点击产品的fid。
            var addfid=this.parentElement.parentElement.getElementsByTagName("input")[0].value;

            //定义价格绑定方法
            function bingprice(){
                var shopcarlist= document.getElementsByClassName("shopcarlist")[0];
                var sumprice=shopcarlist.getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
                var quantity = document.querySelectorAll(".shopcarlist>ul>li>input[value='"+addfid+"']")[0].parentElement.querySelectorAll(".quantity>input")[0];


                var thisli=quantity.parentElement.parentElement;
                var shopcarbuyQTY = quantity.value;
                var totalprice=thisli.getElementsByClassName("totalprice")[0];
                totalprice.innerHTML=(parseFloat(thisli.getElementsByClassName("unitprice")[0].innerHTML)*parseInt(shopcarbuyQTY)).toFixed(2);

                var totalprices=document.querySelectorAll(".shopcarlist>ul>li .totalprice");
                var sumpriceFloat=0;
                for(var i=0;i<totalprices.length;i++){
                    sumpriceFloat=sumpriceFloat+parseFloat(totalprices[i].innerHTML);
                }
                sumprice.innerHTML=sumpriceFloat.toFixed(2);
            }

            //定义删除按钮绑定方法
            function delbtnbind(){
                var delBtns=document.querySelectorAll(".shopcarlist>ul>li>.delete");
                for(var i=0;i<delBtns.length;i++){
                    delBtns[i].onclick=function (){
                        this.parentElement.parentElement.removeChild(this.parentElement);
                        //为删除按钮绑定价格
                    }
                }
            }

            var inputs=document.querySelectorAll(".shopcarlist>ul>li>input");
            var arr = Array.prototype.slice.call(inputs);
            if(inputs.length>0){//判断购物车是否有产品
                //for(var input of inputs){
                if(arr.some(function(elem,i,arr){return elem.value==addfid})){//如果有相同的产品，相同产品数量+1
                    var quantity = document.querySelectorAll(".shopcarlist>ul>li>input[value='"+addfid+"']")[0].parentElement.querySelectorAll(".quantity>input")[0];
                    quantity.value++;
                    //绑定价格
                    bingprice()
                    //绑定数量控制按钮
                    cartcontrol()

                }else{
                    //如果有不同的产品，新增一条产品记录
                    var ul=document.getElementsByClassName("shopcarlist")[0].getElementsByTagName("ul")[0];
                    var imgsrc=addproduct.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
                    var title=addproduct.getElementsByClassName("title")[0].innerHTML;
                    var unitprice=addproduct.getElementsByClassName("newprice")[0].textContent.slice(4);
                    var li = document.createElement("li");
                    li.innerHTML='<input type="hidden" value="'+addfid+'"><div class="pic"><img src="'+imgsrc+'" alt="" ></div><span class="title">'+title+'</span><div class="quantity"><input type="text" class="shopcarbuyQTY" value="1"><div class="shopcarbuyQTYcontrol"><a href="javascript:;" class="shopcarAdd QTYcontrol">+</a><a href="javascript:;" class="shopcarreduce QTYcontrol">-</a></div></div><span class="unitprice">'+unitprice+'</span><span class="totalprice">'+unitprice+'</span><a href="javascript:;" class="delete">删除</a>';

                    ul.appendChild(li);
                    //绑定价格
                    bingprice()
                    //绑定数量控制按钮
                    cartcontrol()
                }
                //}
            }else{//如果购物车里没有产品，点击加入购物车则增加一个商品li到购物车
                var ul=document.getElementsByClassName("shopcarlist")[0].getElementsByTagName("ul")[0];
                var imgsrc=addproduct.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
                var title=addproduct.getElementsByClassName("title")[0].innerHTML;
                var unitprice=parseFloat(addproduct.getElementsByClassName("newprice")[0].textContent.slice(4));

                var li='<input type="hidden" value="'+addfid+'"><div class="pic"><img src="'+imgsrc+'" alt="" ></div><span class="title">'+title+'</span><div class="quantity"><input type="text" class="shopcarbuyQTY" value="1"><div class="shopcarbuyQTYcontrol"><a href="javascript:;" class="shopcarAdd QTYcontrol">+</a><a href="javascript:;" class="shopcarreduce QTYcontrol">-</a></div></div><span class="unitprice">'+unitprice.toFixed(2)+'</span><span class="totalprice">'+unitprice.toFixed(2)+'</span><a href="javascript:;" class="delete">删除</a>';

                ul.innerHTML='<li>'+li+'</li>';
                var sumprice=document.getElementsByClassName("shopcarlist")[0].getElementsByClassName("sumprice")[0].getElementsByTagName("span")[0];
                sumprice.innerHTML=unitprice.toFixed(2);
                cartcontrol();
            }
            //绑定删除按钮
            delbtnbind()
        }
    }

}
$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/nav.html",
        type:"get",
        success:function(result){
            $(result).replaceAll("#mainnav");


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
        }
    });
})
