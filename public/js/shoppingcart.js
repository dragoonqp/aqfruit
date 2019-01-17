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

function changecheck(){
    $("#selectall").change(function(){
        if($("#selectall").is(":checked")){
            $(".buylist>ul>li>div>input[type=checkbox]").prop("checked",true);
            $("#selectall2").prop("checked",true)
        }else{
            $(".buylist>ul>li>div>input[type=checkbox]").prop("checked",false);
            $("#selectall2").prop("checked",false)
        }
        getTotalPrice2()
    });
    $("#selectall2").change(function(){
        if($("#selectall2").is(":checked")){
            $(".buylist>ul>li>div>input[type=checkbox]").prop("checked",true);
            $("#selectall").prop("checked",true)
        }else{
            $(".buylist>ul>li>div>input[type=checkbox]").prop("checked",false);
            $("#selectall").prop("checked",false)
        }
        getTotalPrice2()
    });
    $(".buylist>ul").on("change","input[type=checkbox]",function(){
        var checkboxes=$(".buylist>ul>li>div>input[type=checkbox]");
        var checkarr=[].slice.call(checkboxes);
        var bool=checkarr.every(function(elem,i,arr){
            return elem.checked==true;
        })
        if(bool){
            $("#selectall,#selectall2").prop("checked",true);
        }else{
            $("#selectall,#selectall2").prop("checked",false);
        }
        getTotalPrice2()
    })

}

function getTotalPrice2(){
    var subtotals=$(".select input[type=checkbox]:checked").parent().parent().children("ul .subtotal");
    var arrSubTotals=[].slice.call(subtotals);
    var totalPrice=arrSubTotals.reduce(function(prev,elem,i,arr){
        return prev+parseFloat(elem.innerHTML);
    },0)
    $(".footer .sumQuantity").html(arrSubTotals.length);
    $(".footer .sumprice").html(totalPrice.toFixed(2));
}

function updateshopcart2(result){
    var lis=""
    $(".shopcarlist>ul").html("");
    for(var i=0;i<result.length;i++){
        var totalprice=result[i].nUnitPrice*result[i].count;
        lis+="<li><input type='hidden' value="+result[i].productId+"><div class='select'><input type='checkbox' class='shopcartcheckbox' checked></div><div class='productpic'><img src="+result[i].spic +"></div><div class='productname'>"+result[i].title+"</div><div class='quantity'><input type='text' class='shopcarbuyQTY' value="+result[i].count+"><div class='quantitycontrol'><a href='javascript:;' class='addbtn'>+</a><a href='javascript:;' class='reducebtn'>-</a></div></div><div class='unitprice'>"+result[i].nUnitPrice.toFixed(2)+"</div><div class='subtotal'>"+totalprice.toFixed(2)+"</div><div class='operation'><a href='javascript:;' class='delete'>删除</a></div></li>"
    }
    $(".buylist>ul").html(lis);
    checked2()
    getTotalPrice2()
}

// function addtoshopcart(){
//     $(".pListdiv").on("click","a.addtocartbtn",function (){
//         var uid=1;
//         var $li=$(this).parent().parent().parent();
//         var fid=$li.children("div").children(".fid").val()
//         $.ajax({
//             url:"/shopcart/add",
//             type:"post",
//             data:{fid,uid},
//             datatype:"json",
//             success:function (result) {
//                 updateshopcart(result)
//
//             }
//         })
//     })
// }

function countchange2(){
    var uid=1;
    $(".buylist").on("click",".quantitycontrol a",function(){
        console.log(111)
        if($(this).html()=="+"){
            var num=1;
        }else if($(this).html()=="-"){
            var num=-1;
        }
        var fid=$(this).parent().parent().parent().children("input")[0].value;
        $.ajax({
            url:"/shopcart/countchange",
            type:"post",
            data:{uid,fid,num},
            datatype:"json",
            success:function(result){

                updateshopcart2(result);
                initshopcart();
            }
        })
    })
}

function countEdit2(){
    $(".buylist").on("input propertychange",".quantity input",function(){
        var uid=1;
        var fid=$(this).parent().parent().children("input")[0].value;
        var reg=/^\d+$/;
        var quantity=parseInt($(this).val());
        console.log(quantity)
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

function initshopcart2(){

    var uid=1;
    $.ajax({
        url:"/shopcart/init",
        type:"post",
        data:{uid},
        datatype:"json",
        success:function(result){
            updateshopcart2(result);
            $("#selectall,#selectall2").prop("checked",true);
            countchange2();
            changecheck();
            deleteItem2();
            countEdit2();
        }
    })
}

function checked2(){
    $(".shopcartcheckbox").change(function(){
        getTotalPrice2()
    })
}

function deleteItem2(){
    $(".buylist").on("click",".operation a",function(){
        var uid=1;
        var fid=$(this).parent().parent().children("input")[0].value;
        $.ajax({
            url:"/shopcart/deleteItem",
            type:"post",
            data:{uid,fid},
            datatype:"json",
            success:function(result){
                 if(result.code==201) {
                     $(".buylist>ul>li>input[value=" + fid + "]").parent().remove()
                 }
                getTotalPrice2()
            }
        })
    })
}