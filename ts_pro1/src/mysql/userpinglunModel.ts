import MysqlDB from './class.mysqlDB';

//定义接口到用户数据表字段得映射
interface UserpinglunModel{
  pinglunid?: number | undefined;
  articleid?: number | undefined;
  date?: string | undefined;
  cont?: string | undefined;
  username?: string | undefined;
  userface?: string | undefined;
  nickname?: string | undefined;
}

//操作user评论表
export const userpinglun = new MysqlDB<UserpinglunModel>('user_pinglun');