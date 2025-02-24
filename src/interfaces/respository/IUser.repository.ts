import { IData, IUser } from "../../frameworks/user.Model"

export interface IUserRepository{
  checkEmailExists(email: string): Promise<Boolean>
  phoneNumberExists(phone:string):Promise<Boolean>
  createUser(data: IData): Promise<IUser>
  
  
}