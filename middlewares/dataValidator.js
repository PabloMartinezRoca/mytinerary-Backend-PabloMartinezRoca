import { signInSchema } from "../validators/signInValidator.js"
import { signUpSchema } from "../validators/signUpValidator.js"

const dataValidator = (schema) => (request, response, next) => {
    
    const validation = schema.validate(request.body, { abortEarly: true })

    if(validation.error) {
        const data = {
            dataValidator: true,
            error: validation.error.details[0]
        }
        console.log(validation.error)
        return response.status(400).json(data)
    }
    console.log("Data validated!")
    return next()
}

export default dataValidator