import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from '../models/Users.js'

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

const fn = async (payload, next) => {
    try {
        const user = await User.findOne({ email: payload.checkEmail })

        if (!user) {
            throw new Error("No user exists with this email.")
        }
        next(null, user)
    } catch (error) {
        next(error, null)
    }
}

export default passport.use(new Strategy(opt, fn)) // fn se ejecuta en caso de que la validación del token sea exitosa
