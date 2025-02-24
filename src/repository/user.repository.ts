import userModel, {  IData, IUser } from "../frameworks/user.Model";
import { IUserRepository } from "../interfaces/respository/IUser.repository";

export class UserRepository implements IUserRepository{
  async checkEmailExists(email: string): Promise<Boolean> {
    const user = await userModel.findOne({ email: email })
    return user !== null
  }
  async phoneNumberExists(phone:string):Promise<Boolean>{
    const phoneNumber = await userModel.findOne({phone:phone})
    return phoneNumber!==null
  }
  async createUser(data:IData ): Promise<IUser> {
    try {
      
      const user = new userModel({
        email: data.email,
        phone: data.phone,
        password: data.password,
        personalInfo: {
          dob: data.dob,
          name: data.name,
          currentAddress: data.currentAddress,
          durationAtAddress: data.durationAtAddress, 
          aboutYourself: data.aboutYourself,
        },
        financialInfo: {
          employmentStatus: data.employmentStatus,
          savingsInvestments: data.savingsInvestments,
        },
        status: "basic",
      });
    
      const newUser = await user.save(); // Save to MongoDB
      return newUser
    } catch (error) {
      throw error
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  
}