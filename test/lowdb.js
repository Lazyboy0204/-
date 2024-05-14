const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//初始化數據
// db.defaults({posts:[], user:{}}).write()

//寫入數據
// db.get('posts').push({id:2, title:'今天天氣不錯'}).write()

//獲取數據
// console.log(db.get('posts').value())

//刪除數據
// db.get('posts').remove({id:2}).write()

//更新數據
db.get('posts').find({id:1}).assign({title:'今天下雨囉'}).write()