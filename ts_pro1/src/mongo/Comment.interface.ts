export default interface CommonModel{
	userId?: string,
	//评论内容
	commentCont?: string;
	//点赞数
	isGood?: number;
	//点踩数
	notGood?: number;
	//子评论
	childComment?: any[];
}