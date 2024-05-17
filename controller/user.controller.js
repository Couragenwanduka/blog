import UserService from './services/userService.js';
import appError from './utils/appError.js';
import { comparePassword } from '../config/bcrypt.js'; // Corrected the import path

class UserController {
    constructor() {
        this.userService = new UserService();
    }   

    async saveUser(req, res, next) {
        try {
            const { fullName, userName, email, password, mobile } = req.body;

            // Validation
            if (!fullName || !userName || !email || !password || !mobile) {
                return next(new appError('All fields are required', 400));
            }

            if (typeof fullName !== 'string' || typeof userName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
                return next(new appError('Full Name, Username, Email, and Password must be strings', 400));
            }

            if (typeof mobile !== 'number') {
                return next(new appError('Mobile must be a number', 400));
            }

            if (password.length < 5) {
                return next(new appError('Password must be at least 5 characters', 400));
            }

            const existingUser = await this.userService.findUserByEmail(email);
            if (existingUser) {
                return next(new appError('User already exists', 400));
            }

            const user = await this.userService.createUser(fullName, userName, email, password, mobile);
            return res.status(201).json({ message: 'User successfully created', user });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return next(new appError('Email and Password are required', 400));
            }

            const existingUser = await this.userService.findUserByEmail(email);
            if (!existingUser) {
                return next(new appError('User does not exist', 400));
            }

            const isValidPassword = await comparePassword(password, existingUser.password);
            if (!isValidPassword) {
                return next(new appError('Invalid Password', 400));
            }

            return res.status(200).json({ success: true, message: 'User successfully logged in', user: existingUser });
        } catch (error) {
            next(error);
        }
    }

    async editPassword(req, res, next) {
        try {
            const { email, password } = req.body;

            // Validation
            if (!email || !password) {
                return next(new appError('Email and Password are required', 400));
            }

            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                return next(new appError('User does not exist', 400));
            }

            const change = await this.userService.updateUserPassword(email, password);    
            return res.status(200).json({ success: true, message: 'Password successfully changed' });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) { 
        try {
            const { email } = req.body;

            // Validation
            if (!email) {
                return next(new appError('Email is required', 400));
            }

            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                return next(new appError('User does not exist', 400));
            }

            const deleted = await this.userService.deleteUser(email);    
            return res.status(200).json({ success: true, message: 'User successfully deleted' });
        } catch (error) {
            next(error);
        }
    }

    async saveProfilePicture(req, res, next) { 
        try {
            singleUpload(req, res, async (error) => {
                if (error) {
                    return res.status(400).json({ message: "Error uploading image", error: error });
                }
                
                const file = req.file; // Access the single file
                
                if (!file) {
                    return res.status(400).json({ message: "No image uploaded" });
                }
        
                const uploadImage = await cloudinary.uploader.upload(file.path);
        
                if (!uploadImage) {
                    return res.status(400).json({ message: "Image upload failed" });
                }

                const { id } = req.params; // Corrected id extraction from params
                const imageUrl = uploadImage.secure_url;
                const updatedUser = await this.userService.addUserPicture(id, imageUrl)
                if (!updatedUser) {
                    return res.status(401).json({ error: 'Something went wrong' })
                }
                return res.status(200).json({ message: "Image uploaded successfully" });
        
            });
        } catch (error) {
            next(error);
        }
    }

    async follow(req, res, next){
        try{
    const {userId, interestId}=req.params
    if(!userId || !interestId){
        return next(new appError('userId and interestId are required', 400));
    }
    const interests= await this.userService.findFollowerById(interestId)
    if(interests){
        return next(new appError('user already follows this account', 400));
    } 
    const user= await this.userService.addFollowing(interestId)
    const interest= await this.userService.addFollower(userId)

    res.status(200).json({success:true, message:'follower added successfully'})

        }catch(error){
            next(error);
        }
    }
}

export default UserController;
