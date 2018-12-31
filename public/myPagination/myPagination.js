function showact(){
    var pagination=document.getElementsByClassName("pagination")[0];
    var liList=pagination.getElementsByTagName("a");
    if(liList){
        for(var i=1;i<liList.length-1;i++){
            liList[i].parentElement.classList.remove('show');
        }
    }
    if(liList.length>=7){
        var actLi=document.getElementsByClassName("active")[0];
        var actId=Number(actLi.innerHTML);
        if(actId>=3&&actId<=liList.length-4){
            for(var j=actId-2;j<=actId+2;j++){
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
    var div1 = document.getElementsByClassName('pagination')[0];
    var cli = document.getElementById('l'+num1);
    var ul = div1.getElementsByTagName('ul')[0];
    var li = ul.getElementsByTagName('a');
    for(var i=0;i<li.length;i++){
        li[i].classList.remove('active');
    }
    cli.classList.add('active');
}

function disbtn(){
    var div=document.getElementsByClassName('pagination')[0];
    var ul=div.getElementsByTagName("ul")[0];
    var li=ul.getElementsByTagName("a");
    var prev=ul.firstElementChild.firstElementChild;
    var next=ul.lastElementChild.firstElementChild;
    if(div.getElementsByClassName("disabled")[0]){
        div.getElementsByClassName("disabled")[0].classList.remove('disabled');
    }

    var currentId=Number(div.getElementsByClassName("active")[0].innerHTML);
    if(currentId==1){
        prev.classList.add('disabled')
    }
    if(currentId==Number(li[li.length-2].innerHTML)){
        next.classList.add('disabled')
    }
}
function insertLi(element,num){
    var paginationli=document.createElement("div");
    paginationli.classList.add("pagination");
    element.appendChild(paginationli);
    var pagination=document.getElementsByClassName("pagination")[0];
    pagination.innerHTML='';
    function fun(num){
        var ul = document.createElement('ul');
        for(var i=0;i<num;i++){
            ul.innerHTML+='<li><a id="l'+(i+1)+'" href="javascript:changePage('+(i+1)+')">'+(i+1)+'</a></li>';
        }
        ul.innerHTML='<li class="show"><a id="prev" class="prev show" href="javascript:movepage(-1)">上一页</a></li>'+ul.innerHTML+'<li class="show"><a id="next" class="next show" href="javascript:movepage(1)">下一页</a></li>'
        pagination.appendChild(ul);
    }
    fun(num);
    act(1);
    showact();
    disbtn();
}

function movepage(n){
    var div=document.getElementsByClassName('pagination')[0];
    var ul=div.getElementsByTagName("ul")[0];
    var li=ul.getElementsByTagName("a")
    var prev=ul.firstElementChild.firstElementChild;
    var next=ul.lastElementChild.firstElementChild;
    var afather=document.getElementById("comment").getElementsByClassName("pagination")[0];
    if(afather.getElementsByClassName("disabled")[0]){
        afather.getElementsByClassName("disabled")[0].classList.remove('disabled');
    }

    var currentId=Number(afather.getElementsByClassName("active")[0].innerHTML);
    if(currentId==1){
        prev.classList.add('disabled')
    }
    if(currentId==Number(li[li.length-2].innerHTML)){
        next.classList.add('disabled')
    }
    var newActiveLi=document.getElementById('l'+(currentId+n));
    changePage(currentId+n);
    afather.getElementsByClassName("active")[0].classList.remove('active');
    newActiveLi.classList.add('active');
}

function changePage(num){
    getComments(num)
    //激活编号为num的li。
    act(num);
    //将激活的li前后各2个及自身类名添加.show
    showact()
    //改变active的li时，判断是否是最后和最前面的li，如果是则让按钮禁用
    disbtn();
}

function insertPagination(element,pagenums){
    insertLi(element,pagenums);
}
