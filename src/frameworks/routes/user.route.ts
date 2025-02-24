import express, { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repository/user.repository'
import { UserUseCase } from '../../useCase/user.useCase'
import UserController from '../../controllers/user.controller'

const router = express.Router()

const userRepository = new UserRepository()
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  userController.register(req, res, next)
})
export default router