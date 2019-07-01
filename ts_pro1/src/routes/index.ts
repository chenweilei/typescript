import express from 'express';
let router:any = express.Router();
import * as mysql from '../mysql/';

/* GET home page. */
router.get('/', function(req:any, res:any, next:any) {

  //获取数据
  // user.get({username: '', password: ''})
  // .then( data =>{
  //   console.log(data)
  // })
  //插入数据
  // user.add({
  //   username: '123',
  //   password: '123'
  // }).then( data =>{
  //   console.log(data)
  // })
  //更新数据
  // user.update({
  //   username: '234',
  //   password: '567'
  // }, {
  //   username: '123',
  //   password: '123'    
  // }).then( data =>{
  //   console.log(data)
  // })  
  //删除数据
  mysql.user.delete({
    username: '234',
    password: '567'
  }).then( data => {
    console.log(data)
  } )

  res.render('index', { title: 'Express' });
});

export {router as indexRouter}
