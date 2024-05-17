import Post from "../model/post.js";

class PostService {
    constructor(){

    }
    async createPost(title, body,author,image){
        try{
       const post = new Post({title,body,author,image});
       await post.save();
       return post;
        }catch(error){
            console.log(error);
        }
    }
    async getAllPosts(){
        try{
            const posts = await Post.find();
            return posts;
        }catch(error){
            console.log(error);
        }
    }
    async getPostsByAuthors(authors) {
        try {
            const posts = await Post.find({ author: { $in: authors } });
            return posts;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getPostByAuthor(authorId) {
        try {
            const posts = await Post.find({ author: authorId });
            return posts;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async deletePost(id){
        try{
            const post = await Post.findByIdAndDelete({_id:id});
            return post;
        }catch(error){
            console.log(error);
        }
    }
    
    calculateTrendingScore(post) {
        // You can adjust the weights based on your preferences
        return (post.upvotes * 0.5) + (post.comments.length * 0.3) + (post.upvoters.length * 0.2);
    }

   
}
export default PostService;