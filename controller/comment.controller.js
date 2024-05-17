import CommentService from "../service/comment.service";
import appError from './utils/appError.js';

class CommentContoller{
    constructor(){
        this.commentService = new CommentService();
    }

    async saveComment(req, res, next){
       try{
        const {comment} =req.body;

        const {postId, author,authorName,authorUsername}= req.params

        if(!postId || !author || !authorName || !authorUsername) return next(new appError('Invalid post', 400))

        if(!comment) return next(new appError('comment cannot be empty',400))

        if (comment.length> 100) return next(new appError(' Comment cannot be more than 100 characters',400))

        const comments= {author, authorName, authorUsername,comment}

        const  savecomment= await this.commentService.createComment(postId,comments)
        
        res.status(201).json({  status:'success',data:savecomment})
       }catch(error){
         next(error);
       }
    }

    async getComments(req,res,next){
        try{
          const {postid}= req.params
          const comments= await this.commentService.getAllPostComments(postid)
          res.status(200).json({status:'success',data:comments})
        }catch(error){
            next(error);
        }
    }

    async deleteComment(req,res,next){
        try{
            const {commentid}= req.params
            const comment= await this.commentService.deleteComment(commentid)
            res.status(200).json({status:'success',data:comment})
        }catch(error){
            next(error);
        }
    }
}