import User from "../model/user.js";
import {hashPassword} from '../config/bcrpty.js'

class UserService{

    constructor(){

    }
    async createUser(fullName,userName,email,password,mobile){
        const secrect = await hashPassword(password)
        try{
         const saveUser =  new User({fullName,userName,email,password:secrect,mobile});
         const user = await saveUser.save();
         return user;
        }catch(error){
            console.log(error);
        }
    }

    async findUserByEmail(email){
        try{
            const user = await User.findOne({email});
            return user;
        }catch(error){
            console.log(error);
        }
    }
    async addUserPicture(id,imageUrl){
         try{
          const updateUser= findByIdAndUpdate(id,{profilePicture:imageUrl}, {new:true});
          return updateUser;
         }catch(error){
             console.log(error);
         }
    }

    async updateUserPassword(email,password){
        try{
            const secrect = await hashPassword(password)
            const user = await User.findOneAndUpdate({email},{$set:{password:secrect}},{new:true});
            return user;
        }catch(error){
            console.log(error);
        }
    }
    async deleteUserByEmail(email){
        try{
            const user = await User.findOneAndDelete({email});
            return user;
        }catch(error){
            console.log(error);
        }
    }

    async addFollowing(id,interestId){
        try{
            const user = await User.findOneAndUpdate({_id:id},{$push:{followings:interestId}},{new:true});
            return user;
        }catch(error){
            console.log(error);
        }
    }

    async addFollower(id,interestId){
        try{
            const user = await User.findOneAndUpdate({_id:id},{$push:{followers:interestId}},{new:true});
            return user;
        }catch(error){
            console.log(error);
        }
    }

    async findFollowerById(id){
        try{
            const user = await User.findOne({followings:id});
            return user;
        }catch(error){
            console.log(error);
        }
    }

    async addPost(id,postId){
        try{
            const user = await User.findOneAndUpdate({_id:id},{$push:{posts:postId}},{new:true});
            return user;
        }catch(error){
            console.log(error);
        }
    }

    async getUserById(id){
        try{
            const user = await User.findOne({_id:id});
            return user;
        }catch(error){
            console.log(error);
        }
    }
    async removePost(userId, postId) {
        return User.findByIdAndUpdate(userId, { $pull: { posts: postId } }, { new: true });
    }
    
}

export default UserService;