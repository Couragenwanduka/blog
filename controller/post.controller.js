import appError from '../error/appError.js';
import PostService from '../service/post.service.js';
import UserService from '../service/user.service.js';
import { singleUpload } from '../middleware/multer.js';

class PostController {
    constructor() {
        this.postService = new PostService();
        this.userService = new UserService();
    }

    async createPost(req, res, next) {
        try {
            const { title, body, author } = req.body;
            singleUpload(req, res, async (error) => {
                if (error) return next(new appError("Error uploading image", 400));
        
                const file = req.file;

                if (!file) return next(new appError("No image uploaded", 400));

                const uploadImage = await cloudinary.uploader.upload(file.path);

                if (!uploadImage.secure_url) return next(new appError("Image upload failed", 400));

                const imageUrl = uploadImage.secure_url;

                if(!title||!body||!author) return next(new appError("Please fill all the fields", 400));

                if(title.length >50)return next(new appError(" Title exceed the limit", 400));

                if(body.length >500)return next(new appError(" Body exceed the limit", 400));

                const post = await this.postService.createPost({ title, body, author, imageUrl });
                

                const user= await this.userService.addPost(author,post._id)

                return res.status(201).json({ message: "Post created successfully", post });
            });
        } catch (error) {
            next(error);
        }
    }

    async getPost(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                return next(new appError('User not found', 404));
            }

            const authorIds = user.followings;
            let posts = [];

            if (authorIds.length > 0) {
                // Fetch posts from followed authors
                posts = await this.postService.getPostsByAuthors(authorIds);
            } else {
                // Fetch all posts if the user is not following anyone
                posts = await this.postService.getAllPosts();
            }

            // Calculate trending scores and sort posts
            posts = posts.map(post => ({
                ...post.toObject(),
                trendingScore: this.postService.calculateTrendingScore(post)
            }));

            posts.sort((a, b) => b.trendingScore - a.trendingScore || new Date(b.date) - new Date(a.date));

            res.status(200).json({ message: "Posts fetched successfully", posts });
        } catch (error) {
            next(error);
        }
    }

    async getPostByid(req, res, next) {
        try {
            const {id}= req.params
            const post = await this.postService.getPostByAuthor(id);
            if (!post) return next(new appError('Post not found', 404));
            return req.status(200).json({ message: " posts fetched successfully", post });
        } catch (error) {
            next(error);
        }
    }
    async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const post = await this.userService.deletePost(id);
            if (post) {
                return next(new appError('Post not found', 404));
            }
            await this.userService.removePost(post.author, id);
            res.status(200).json({ message: "Post deleted successfully" });
        }
        catch (error) {
            next(error);
        }
}
}

export default PostController;
