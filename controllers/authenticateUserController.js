import bcrypt from 'bcryptjs'
import User from '../models/Users.js'
import Country from '../models/Country.js'

const authenticateUserController = {

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
            return response.status(201).json({
                success: true,
                userDate: newUser,
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
            let { email, password } = request.body

            const userExists = await User.findOne({ email })

            if (!userExists) {
                throw new Error("No user exists with this email")
            }

            let passwordValidated = bcrypt.compareSync(password, userExists.password)

            if (!passwordValidated) {
                throw new Error("The email/password is incorrect")
            }

            return response.status(200).json({
                success: true,
                userData: userExists,
                message: 'Sign in successfully'
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

export default authenticateUserController