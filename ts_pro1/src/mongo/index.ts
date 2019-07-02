import MongoDB from './class.mongoDB';
import UserModel from './User.interface';
import CommentModel from './Comment.interface';

MongoDB.creatConnection({
  database:'myblog',
})

export const User = new MongoDB<UserModel>('User')
export const Comment = new MongoDB<CommentModel>('Comment')

