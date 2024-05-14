var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')
//導入moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');



// 記帳本列表
router.get('/account', checkTokenMiddleware, function(req, res, next) {
  
  //校驗token
  
    AccountModel.find().sort({time: -1}).exec().then(value=>{
      res.json({
        code: '0000',
        msg: '讀取成功',
        data: value
      })
    }).catch(e=>{
      if(e){
        res.json({
          code:1001,
          msg:'讀取失敗',
          data:null
        })
      }
    })
});

router.get('/account/create', checkTokenMiddleware, function(req, res, next) {
  res.render('create')
});

router.post('/account', checkTokenMiddleware, (req,res)=>{
  //表單驗證
  if(!req.body.title){
    res.json({
      code: '1003',
      msg: '沒有標題',
      data: null
    })
    return
  }
  if(!req.body.time){
    res.json({
      code: '1004',
      msg: '沒有時間',
      data: null
    })
    return
  }
  if(!req.body.type){
    res.json({
      code: '1005',
      msg: '沒有類型',
      data: null
    })
    return
  }
  if(!req.body.account){
    res.json({
      code: '1006',
      msg: '沒有金額',
      data: null
    })
    return
  }
  // 插入數據庫
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }).then(value=>{
    res.json({
      code: '0000',
      msg: '創建成功',
      data: value
    })
  }).catch(
    res.json({
      code: '1002',
      msg: '創建失敗',
      data: null
    })
  )
  
})

router.delete('/account/:id', checkTokenMiddleware, (req, res)=>{
  let id = req.params.id
  AccountModel.deleteOne({_id:id}).then(value=>{
    res.json({
      code: '0000',
      msg: '刪除成功',
      data: value
    })
  }).catch(e=>{
    if(e){
      res.json({
        code: '1008',
        msg: '刪除失敗',
        data: null
      })
    }
  })
})

router.get('/account/:id', checkTokenMiddleware, (req, res)=>{
  let id = req.params.id
  AccountModel.findById(id).then(value=>{
    res.json({
      code: '0000',
      msg: '讀取成功',
      data: value
    })
  }).catch(e=>{
    res.json({
      code: '1004',
      msg: '讀取失敗',
      data: null
    })
  })
})

router.patch('/account/:id', checkTokenMiddleware, (req, res)=>{
  let {id} = req.params
  AccountModel.updateOne({_id:id}, req.body).then(value=>{
    AccountModel.findById(id).then(value=>{
      res.json({
        code: '0000',
        msg: '更新成功',
        data: value
      })
    }).catch(e=>{
      res.json({
        code: '1004',
        msg: '讀取失敗',
        data: null
      })
    })
    
  }).catch(e=>{
    res.json({
      code: '1005',
      msg: '更新失敗',
      data: null
    })
  })
})


module.exports = router;
