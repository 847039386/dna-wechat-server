var express = require('express');
var router = express.Router();
var movie = require("../common").movie
var WXInterface = require("../common").WXInterface
var wx_config = require("../config").wx


router.get("/",function(req,res){
    //res.render("index",{})
    res.json("")
})

/* GET home page. */
//router.get('/0/token',WXInterface.getAccessToken);              //查看access_token
//router.get('/0/createMenu',WXInterface.createMenuRouter)        //创建菜单
//router.get('/0/deleteMenu',WXInterface.deleteMenuRouter)        //删除菜单



module.exports = router;
