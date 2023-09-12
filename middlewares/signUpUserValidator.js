import { request } from "express"
import { signUpSchema } from "../validators/signUpValidator"

const signUpUserValidator = (request, response, next) => {
    signUpSchema.validate({
        ...request.body // Se puede listar propiedad por propiedad
    }, { abortEarly: true })

    if(signUpUserValidator.error) {
        console.log(signUpUserValidator)
        return
    }
    return next()
}

export default signUpUserValidator