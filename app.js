
//引入必要的模块
const express = require('express');
const userRouter = require('./routers/user.js');
const productRouter = require('./routers/product.routes.js');
const bodyPaser = require('body-parser');
const user_adminRouter = require('./routers/user_admin.js');
const shopcart=require("./routers/shopcart.routes");
var app = express();
app.listen(5050);
app.use(bodyPaser.urlencoded({
	extended:false
}));
//使用被托管的静态资源
app.use(express.static('public'));

//使用路由器
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/user_admin',user_adminRouter);
app.use("/shopcart",shopcart);