import { NextFunction, Request, Response } from "express";
import IUserUseCase from "../interfaces/useCase/IUser.usecase";

export default class UserController {
  private userUseCase: IUserUseCase
  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      console.log("reached", data);

      const response = await this.userUseCase.registerUser(data)
      res.status(201).json({ status: "success", data: response })

    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }


  }
  async getUserByEmail(req: Request, res: Response,next:NextFunction) {
    try {
      const email = req.params.email; // Get email from URL params
      console.log("entering..",email);
      
      const user = await this.userUseCase.getUserByEmail(email)
      console.log(user);
      
      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}