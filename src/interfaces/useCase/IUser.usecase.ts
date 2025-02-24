import { IUser } from "../../frameworks/user.Model";
import { RegisterUserResponse } from "../../useCase/user.useCase";

export default interface IUserUseCase{
  registerUser(data: any): Promise<RegisterUserResponse>
  getUserByEmail(email: string): Promise<IUser | null>
}