import { signInSchema } from "../validators/signInValidator.js"
import { signUpSchema } from "../validators/signUpValidator.js"

const dataValidator = (schema) => (request, response, next) => {
    
    const validation = schema.validate(request.body, { abortEarly: true })

    if(validation.error) {
        console.log(validation)
        return response.json(validation.error)
    }
    return next()
}

export default dataValidator