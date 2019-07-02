import express from 'express';
let router:any = express.Router();
//import * as MysqlDB from '../mysql/';
import * as MongoDB from '../mongo/';

//console.log(MongoDB)

/* GET home page. */
router.get('/', function(req:any, res:any, next:any) {
  //MongoDB数据库

    // MongoDB.User.get().then( data=>{
    //   console.log(data)
    // } )

    // MongoDB.Comment.add({
    //   commentCont: '测试',
    //   isGood: 1,
    //   notGood: 1
    // }).then( data=>{
    //   console.log(data)
    // } )

    // MongoDB.Comment.delete({
    //   commentCont: '测试',
    //   isGood: 1,
    //   notGood: 1
    // }).then( data=>{
    //   console.log(data)
    // } )

    //第一个参数为数据，第二个参数是条件
    // MongoDB.Comment.update({
    //   isGood: 2,
    // },{
    //   isGood: 1,
    // }).then( data=>{
    //   console.log(data)
    // } )

    // MongoDB.Comment.updateMany({
    //   commentCont: '测试3',
    //   isGood: 3,
    //   notGood: 3
    // },{
    //   commentCont: '测试',
    //   isGood: 1,
    //   notGood: 1
    // }).then( data=>{
    //   console.log(data)
    // } )

  //Mysql数据库
    //获取数据
    // MysqlDB.user.get({username: '', password: ''})
    // .then( data =>{
    //   console.log(data)
    // })
    //插入数据
    // MysqlDB.user.add({
    //   username: '123',
    //   password: '123'
    // }).then( data =>{
    //   console.log(data)
    // })
    //更新数据
    // MysqlDB.user.update({
    //   username: '234',
    //   password: '567'
    // }, {
    //   username: '123',
    //   password: '123'    
    // }).then( data =>{
    //   console.log(data)
    // })  
    //删除数据
    // MysqlDB.user.delete({
    //   username: '234',
    //   password: '567'
    // }).then( data => {
    //   console.log(data)
    // } )

  res.render('index', { title: 'Express' });
});

export {router as indexRouter}
