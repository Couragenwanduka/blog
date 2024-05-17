import User from "../model/user.js";
import {hashPassword} from '../config/bcrpty.js'

class UserService{

    constructor(){
        if (UserService.instance){
            return UserService.instance;
        }
        UserService.instance = this;
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
    static getinstance(){
        if(!UserService.instance){
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}

export default UserService.getinstance();