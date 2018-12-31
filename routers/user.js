const express = require('express');
const pool = require('../pool.js');
var router = express.Router();
var regData,loginData;

router.post('/register',(req,res)=>{
	//将路由请求数据保存到变量中
	regData=req.body;
	console.log(regData);
	var $uname=regData.uname;
	var $upwd=regData.upwd;
	var $email=regData.email;
	var $phone=regData.phone;
	var $user_name=regData.user_name;
	var $gender=regData.gender;
	var $avatar=regData.avatar;
	var $isOnline=regData.isOnline;
	var $safeQue=regData.safeQue;
	var $safeAns=regData.safeAns;
	/*
	for(key in regData){
		if(regData[key].length<1){
			res.send(`%{regData[key]} required`);
			return;
		}
	}
	*/


	//对必填内容进行检查是否有填
	if(!regData.uname){
			res.send({code:101,msg:'uname required'});
			return;
	}
	if(!regData.upwd){
			res.send({code:102,msg:'upwd required'});
			return;
	}
	if(!regData.email){
			res.send({code:103,msg:'email required'});
			return;
	}
	if(!regData.phone){
			res.send({code:104,msg:'email required'});
			return;
	}
	pool.query('INSERT INTO aq_user VALUES(NULL,?,?,?,?,?,?,?,?,?,?)',[$uname,$upwd,$email,$phone,$user_name,$gender,$avatar,$isOnline,$safeQue,$safeAns],(err,result)=>{
		if(err){throw err;}
		if(result.affectedRows>0){
			res.send({code:200,msg:'register success'});
		}else{
			res.send({code:400,msg:'register failed'});
		}
	});
});

router.get('/registerCheck',(req,res)=>{
	var $uname=req.query.uname;
	pool.query('SELECT * FROM aq_user WHERE uname=?',[$uname],(err,result)=>{
		if(err){throw err;}
		if(result.length>0){
			res.send({code:0,msg:'exists'});
		}else{
			res.send({code:1,msg:'not exists'});	
		}
	});
});

router.post('/login',(req,res)=>{
	loginData = req.body;
	var $uname = loginData.uname;
	var $upwd = loginData.upwd;

	for(key in loginData){
		if(!loginData[key]){
			res.send(`${key} required`);
			return;
		}
	}
	pool.query('SELECT * From aq_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			var loginRes;
			//更改是否在线为是。
			pool.query('UPDATE aq_user SET isOnline=1 WHERE uname=?',[$uname],(err,result)=>{
				loginRes = result.affectedRows;
			});
			//响应登陆结果
			res.send({code:201,msg:'login success'});
		}else{
			res.send({code:401,msg:'login failed'});
		}
	});
});

module.exports=router;