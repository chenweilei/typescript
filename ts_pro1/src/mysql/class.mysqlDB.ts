//import path from 'path';
import mysql from 'mysql';
import DB from '../interface.db';

//mysql配置
interface MysqlConf {
	host:string;
	user:string;
	password:string;
	database:string;
}

class MysqlDB<T> implements DB<T> {

	static pool: mysql.Pool;

	constructor(private tableName: string){

	}

	private query(queryStr:string, val:Array<any> | null = null):Promise<any>{
		return new Promise((resolve, reject)=>{
			MysqlDB.pool.getConnection((err: mysql.MysqlError,connection: mysql.PoolConnection)=>{
				if(err){ reject(err) }
				connection.query(queryStr, val, (error,results,fields)=>{
					//将链接返回到连接池中，准备由其他人重复使用
					connection.release();
					if(error){ reject(error) }
					//执行回调函数，将数据返回
					resolve(JSON.parse(JSON.stringify(results)));
				});
			})
		})
	}
	//接受json对象 返回 key 数组
	private jsonKeyToArr(select:T):string[]{
		let arrKey = Object.getOwnPropertyNames(select);
		return arrKey
	}
	//接受 json对象 返回 val 数组
	private jsonValToArr(model: T):any[]{
		let valArr:any[] = [];

		for(let name in model){
			valArr.push(model[name])
		}
		return valArr
	}

	//创建连接
	static creatConnection(conf: MysqlConf):void{
		MysqlDB.pool = mysql.createPool({
			host     : conf.host,
			user     : conf.user,
			password : conf.password,
			database : conf.database
		});
	}
	//获取
	get(select?: T){
		let selectStr =  select?this.jsonKeyToArr(select).join(','):'*';
		return this.query(`SELECT ${selectStr} FROM ${this.tableName}`)
	}
	//添加
	add(model: T){
		let insertStr = this.jsonKeyToArr(model);
		let valuesStr = insertStr.map(()=>'?').join(',');
		let val = this.jsonValToArr(model);

		return this.query(`INSERT INTO ${this.tableName}(${insertStr}) VALUES(${valuesStr})`, val)
	}
	//删除
	delete(where: T){
		let whereKeyArr = this.jsonKeyToArr(where);
		let whereValArr = this.jsonValToArr(where);
		return this.query(`DELETE FROM ${this.tableName} WHERE ${whereKeyArr.map( item => item + '=?').join(' AND ')}`, whereValArr)
	}
	//更新
	update(model: T, where: T){
        let setKeyArr = this.jsonKeyToArr(model);
        let whereKeyArr = this.jsonKeyToArr(where);
        let setValArr = this.jsonValToArr(model);
        let whereValArr = this.jsonValToArr(where);

        let setStr = setKeyArr.map(item => item + '=?').join(',');
        let whereStr = whereKeyArr.map( item => item + '=?').join(' AND ');
        return this.query(`UPDATE ${this.tableName} SET ${setStr} WHERE ${whereStr}`, setValArr.concat(whereValArr))
	}

}

export default MysqlDB