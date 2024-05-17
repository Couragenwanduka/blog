import UserService from './services/userService.js';
import appError from './utils/appError.js';
import { comparePassword } from '../config/bcrpty.js';

class UserController {
    constructor() {
        this.userService = new UserService;
    }   

    async saveUser(req, res, next) {
        try {
            const { fullName, userName, email, password, mobile } = req.body;

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

           const existingUser= await this.userService.findUserByEmail(email);
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
            if (!email) {
                return next(new appError('Email are required', 400));
            }
            if (!password) {
                return next(new appError('Password are required', 400));
            }
            const existingUser= await this.userService.findUserByEmail(email);
            if (!existingUser) {
                return next(new appError('User does not exist', 400));
            }
            const isValidPassword = await comparePassword(password, existingUser.password);
            if (!isValidPassword) {
                return next(new appError('Invalid Password', 400));
            }
            return  res.status(200).json({success: true , message: 'user successfully login ', user: existingUser})

    }catch(error){
        next(error);
     }
 }

   async editPassword(){
    try {
        const { email, password } = req.body;
        if (!email) {
            return next(new appError('Email are required', 400));
        }
        if (!password) {
            return next(new appError('Password are required', 400));
        }
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            return next(new appError('User does not exist', 400));
        }
        const change = await this.userService.updateUserPassword(email,password)    
        return  res.status(200).json({success: true , message: 'password successfully changed '})
   }catch(error){
    next(error);
  
   }}

async deleteUser(){
    try {
        const { email } = req.body;
        if (!email) {
            return next(new appError('Email are required', 400));
        }
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            return next(new appError('User does not exist', 400));
        }
        const deleted = await this.userService.deleteUser(email)    
        return  res.status(200).json({success: true , message: 'user successfully deleted '})
}catch(error){
    next(error);
}
}

}
