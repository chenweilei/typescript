import MysqlDB from './class.mysqlDB';

//定义接口到用户数据表字段得映射
interface UserModel{
  userid?: number | undefined;
  username?: string | undefined;
  password?: string | undefined;
  createdate?: string | undefined;
  nickname?: string | undefined;
  userdesc?: string | undefined;
  userface?: string | undefined;
}

//操作user表
export const user = new MysqlDB<UserModel>('user');