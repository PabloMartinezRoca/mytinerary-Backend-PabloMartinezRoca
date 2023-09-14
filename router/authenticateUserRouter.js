import { Router } from 'express'
import authenticateUserController from '../controllers/authenticateUserController.js'
import dataValidator from '../middlewares/dataValidator.js'
import { signInSchema } from '../validators/signInValidator.js'
import { signUpSchema } from '../validators/signUpValidator.js'
import emailExists from '../middlewares/emailExists.js'
import passport from '../middlewares/passport.js'

const authenticateUserRouter = Router()

const { loginWithToken, signIn, signUp } = authenticateUserController

authenticateUserRouter.post('/login', dataValidator(signInSchema), signIn )
authenticateUserRouter.post('/register', dataValidator(signUpSchema), emailExists, signUp )
authenticateUserRouter.get('/token/', passport.authenticate('jwt', { session: false }), loginWithToken)

export default authenticateUserRouter 