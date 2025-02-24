import { RegisterUserResponse } from "../../useCase/user.useCase";

export default interface IUserUseCase{
  registerUser(data: any): Promise<RegisterUserResponse>
}