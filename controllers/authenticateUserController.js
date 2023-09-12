import bcrypt from 'bcryptjs'
import User from '../models/Users.js'
import Country from '../models/Country.js'
import jwt from 'jsonwebtoken'

const authenticateUserController = {

    loginWithToken: (request, response) => {
        const userData = { ...request.user._doc }
        delete userData.pass

        response.status(200).json({ 
            success: true,
            userData: userData,
            body: request.body,
            message: 'Sign in successfully'
        })
    },

    signUp: async (request, response, next) => {

        // Password encryptation
        const passwordHash = bcrypt.hashSync(request.body.pass, 10)
        // console.log(passwordHash)
        let body = { ...request.body }
        body.pass = passwordHash

        // get Country Id or insert new Country
        let countryId

        await Country.findOne({ country: body.country })
            .select('_id') // Select only the '_id' field
            .then(country => {
                if (country) {
                    countryId = country._id;
                } else {
                    console.log("NO COUNTRY FOUND")
                    // TO DO : insert new Country
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });

        const newUserData = {
            ...body,
            country: countryId
        }

        try {

            const newUser = await User.create(newUserData)

            const token = jwt.sign( { email: newUser.email, photo: newUser.photo }, process.env.SECRET_KEY, { expiresIn: '1h' } ) // Crea y firma el token // SECRET_KEY en .env

            return response.status(201).json({ // Create user and login at once
                success: true,
                userDate: newUser,
                token: token,
                message: 'SIGN_UP_SUCCESSFULLY'
            })

        } catch (err) {
            console.log(err)
            response.send(err)
            next(err)
        }
    },

    signIn: async (request, response, next) => {
        try {
            let { email: checkEmail , pass: checkPassword } = request.body

            const userFound = await User.findOne({ email: checkEmail })

            if (!userFound) {
                throw new Error("No user exists with this email")
            }

            let passwordValidated = bcrypt.compareSync(checkPassword, userFound.pass)

            if (!passwordValidated) {
                throw new Error("The email/password is incorrect")
            }

            let { email, photo, dateOfBirth } = userFound

            const token = jwt.sign( { checkEmail, photo }, process.env.SECRET_KEY, { expiresIn: '1h' } ) // Crea y firma el token // SECRET_KEY en .env

            return response.status(200).json({
                success: true,
                userData: { email, photo, dateOfBirth },
                token: token,
                message: 'Sign in successfully'
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

export default authenticateUserController