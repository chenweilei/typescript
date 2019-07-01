import MysqlDB from './class.mysqlDB';

//创建链接
MysqlDB.creatConnection({
  host:'localhost',
  user:'www',
  password:'www',
  database:'cwlblog',
});

//导出用户表
export * from './userModel'
//导出用户评论表
export * from './userpinglunModel'
