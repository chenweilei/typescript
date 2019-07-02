import mongodb from 'mongodb';
import DB from '../interface.db';


//mongodb配置
interface mongodbConf {
	host?:string;
	port?:string;
	user?:string;
	database:string;
}

class MongoDB<T> implements DB<T>{
	static connect:any = null;
	static conf:mongodbConf;
	static dbo:any = null;

	constructor(private tableName: string){

	}	

	//创建连接
	static creatConnection(conf: mongodbConf){
		MongoDB.conf = conf;
		let url = `mongodb://${conf.host?conf.host:'localhost'}:${conf.port?conf.port:'27017'}/${conf.database}`;
		mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, db)=>{
			if(err) throw err;
			MongoDB.connect = db;
			console.log('Mongodb数据库连接成功')
		})
	}

	private getDbo():any{
		return MongoDB.connect.db(MongoDB.conf.database).collection(this.tableName)
	}
	//查询数据
	get(select?: T | undefined): Promise<any> {
		return new Promise( (resolve, reject) => {
			this.getDbo().find( select || {} ).toArray( (err:any, res:any)=>{
				if ( err ) reject(err)
				resolve(res)
			})
		})
	}	
	//添加一条
	add(data: T): Promise<any> {
		return new Promise( (resolve, reject) => {
			this.getDbo().insertOne(data,  (err:any, res:any)=>{
				if ( err ) reject(err)
				resolve(res.result)
			})
		})
	}
	//删除一条
	delete(where: T): Promise<any> {
		return new Promise( (resolve, reject) => {
			this.getDbo().deleteOne(where,  (err:any, res:any)=>{
				if ( err ) reject(err)
				resolve(res.result)
			})
		})
	}
	//更新一条
	update(data: T, where: T): Promise<any> {
		return new Promise( (resolve, reject) => {
			this.getDbo().updateOne(where, {$set: data}, (err:any, res:any)=>{
				if ( err ) reject(err)
				resolve(res.result)
			})
		})
	}
	//更新多条
	updateMany(data: T, where: T): Promise<any> {
		return new Promise( (resolve, reject) => {
			this.getDbo().updateMany(where, {$set: data}, (err:any, res:any)=>{
				if ( err ) reject(err)
				resolve(res.result)
			})
		})
	}

}

export default MongoDB