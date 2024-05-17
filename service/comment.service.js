import Comment from "../model/comment.js";


class CommentService {


    async createComment(postId,comments){
        try{
        
            const newComment = new Comment({
                postId,
                comments
            });
            const comment = await newComment.save();
            return comment;
        }catch(error){
            console.log(error);
        }
    }
    async getComments(postId){
        try{
            const comments = await Comment.find({postId});
            return comments;
        }catch(error){
            console.log(error);
        }
    }
    
    async deleteComment(commentId){
        try{
            const comment = await Comment.findByIdAndDelete(commentId);
            return comment;
        }catch(error){
            console.log(error);
        }
    }

}

export default  CommentService;