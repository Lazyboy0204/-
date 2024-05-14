var express = require('express');
var router = express.Router();
const UserModel = require('../../models/UserModel')
const md5 = require('md5')

router.get('/reg', (req, res)=>{
    res.render('reg')
})

router.post('/reg', (req, res)=>{
    //獲取請求體數據
    UserModel.create({...req.body, password : md5(req.body.password)}).then(value=>{
        res.render('success', {msg:'註冊成功', url:'/login'})
    }).catch(e=>{
        if(e){
            res.status(500).send('註冊失敗')
            return
        }
    })
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', (req, res)=>{
    let {username, password} = req.body
    UserModel.findOne({username, password : md5(password)}).exec().then(value=>{
        if(!value){
            res.status(500).send('帳號或密碼錯誤')
            return
        }else{
            req.session.username = value.username
            req.session._id = value._id
            res.render('success', {msg: '登入成功', url: '/account'})
        }
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', {msg : '退出成功', url : '/login'})
    })
})

module.exports = router;
