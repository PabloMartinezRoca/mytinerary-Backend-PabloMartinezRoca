import User from '../models/Users.js'

const emailExists = async (request, response, next) => {
    const exists = await User.findOne({ email: request.body.email })

    if (!exists) {
        console.log("Email is available!")
        return next()
    } 
    return response.status(400).json({
        success: false,
        message: "Email already exists."
    })
}

export default emailExists