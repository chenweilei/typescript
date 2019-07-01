//数据库操作统一接口
export default interface DB<T>{
	//获取数据
	get(select?: T):Promise<any>
	//添加数据
	add(data:T):Promise<any>;
	//删除数据
	delete(where: T):Promise<any>;
	//更新数据
	update(data: T, where: T):Promise<any>
}
