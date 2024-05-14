var express = require('express');
var router = express.Router();
//導入jwt
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/UserModel')
const md5 = require('md5')


router.post('/login', (req, res)=>{
    let {username, password} = req.body
    UserModel.findOne({username, password : md5(password)}).exec().then(value=>{
        if(!value){
            res.json({
                code: '2002',
                msg: '帳號或密碼錯誤',
                data: null
            })
        }else{
            //創建token
            let token = jwt.sign({
                username: value.username,
                _id: value._id
            }, 'atguigu', {
                expiresIn: 60 * 60 * 24 * 7
            })
            res.json({
                code: '0000',
                msg: '登入成功',
                data: token
            })
        }
    }).catch(e=>{
        if(e){
            res.json({
                code: '2001',
                msg: '數據庫讀取失敗',
                data: null
            })
        }
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', {msg : '退出成功', url : '/login'})
    })
})

module.exports = router;
