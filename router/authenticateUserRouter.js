import { Router } from 'express'
import authenticateUserController from '../controllers/authenticateUserController.js'
import dataValidator from '../middlewares/dataValidator.js'
import { signUpSchema } from '../validators/signUpValidator.js'
import emailExists from '../middlewares/emailExists.js'

const authenticateUserRouter = Router()

const { signUp } = authenticateUserController

authenticateUserRouter.post( '/', dataValidator(signUpSchema), emailExists, signUp )

export default authenticateUserRouter 