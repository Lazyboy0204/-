var express = require('express');
var router = express.Router();
//導入moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel.js');
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware.js')

router.get('/', (req, res) => {
  res.redirect('/account')
})
// 記帳本列表
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  
  AccountModel.find().sort({time: -1}).exec().then(value=>{
    res.render('list', {accounts:value,moment})
  }).catch(e=>{
    if(e){
      res.status(500).send('讀取失敗~~')
    }
  })
});

router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create')
});

router.post('/account', checkLoginMiddleware, (req,res)=>{
  // console.log(req.body)
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(
    res.render('success', {msg:'添加成功~~~~', url:'/account'})
  ).catch(e=>{
    res.status(500).send('插入失敗~~')
  })
  
})

router.get('/account/:id', checkLoginMiddleware, (req, res)=>{
  let id = req.params.id
  AccountModel.deleteOne({_id:id}).then(value=>{
    res.render('success', {msg:'刪除成功~~~~', url:'/account'})
  }).catch(e=>{
    if(e){
      res.status(500).send('刪除失敗')
    }
  })
})

module.exports = router;
