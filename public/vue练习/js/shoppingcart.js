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