import express from 'express';
const router= express.Router();
import UserController from '../controller/user.controller.js'
import PostController from '../controller/post.controller.js'
import CommentContoller from '../controller/comment.controller.js'
const userController = new UserController();
const postController = new PostController();
const commentController = new CommentContoller();

//  routes for user interaction
router.post('/register',userController.saveUser);
router.post('/login', userController.login);
router.patch('updatepassword', userController.updatePassword);
router.delete('deleteUser', userController.deleteUser);
router.post('saveProfile',userController.saveProfilePicture);
router.post('follow',userController.follow)

// routes for post 
router.post('/createpost', postController.createPost)
router.get('/post/:id',postController.getPost);
router.get('/userpost/:id', postController.getPostByid);
router.delete('deletePost', postController.deletePost);

// routes for comment
router.post('/createcomment', commentController.saveComment);
router.get('/comment/:id', commentController.getComments)
router.delete('deleteComment', commentController.deleteComment);

export default router;