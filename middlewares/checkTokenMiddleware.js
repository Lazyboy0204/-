const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //獲取token
    let token = req.get('token')
    //判斷
    if(!token){
      return res.json({
        code: '2003',
        msg: 'token 缺失',
        data: null
      })
    }
    jwt.verify(token, 'atguigu', (err, data) => {
      if(err){
        return res.json({
          code: '2004',
          msg: 'token 校驗失敗',
          data: null
        })
      }
      next()
    })
  }