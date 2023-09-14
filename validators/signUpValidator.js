import joi from 'joi-oid'
import joiPwd from 'joi-password-complexity'

const complexityOptions = {
    min: 4,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

const currentDate = new Date()

console.log(joi.object)
const signUpSchema = joi.object({
    email: joi.string().required().email().messages({
        'string.base': 'Email should be a valid string.',
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
    }),
    pass: joiPwd(complexityOptions).messages({
        'passwordComplexity.base': 'Password should meet the complexity requirements.',
        'passwordComplexity.tooShort': 'Password must be at least {#limit} characters long.',
        'passwordComplexity.tooLong': 'Password cannot exceed {#limit} characters.',
        'passwordComplexity.lowercase': 'Password should contain at least {#limit} lowercase letter(s).',
        'passwordComplexity.uppercase': 'Password should contain at least {#limit} uppercase letter(s).',
        'passwordComplexity.numeric': 'Password should contain at least {#limit} numeric character(s).',
        'passwordComplexity.symbol': 'Password should contain at least {#limit} special character(s).',
      }),
    firstName: joi.string().required().min(2).max(32).messages({
        'string.base': 'First name should be a valid string.',
        'string.empty': 'First name is required.',
        'string.min': 'First name must be at least {#limit} characters long.',
        'string.max': 'First name cannot exceed {#limit} characters.',
    }),
    lastName: joi.string().required().min(2).max(32).messages({
        'string.base': 'Last name should be a valid string.',
        'string.empty': 'Last name is required.',
        'string.min': 'Last name must be at least {#limit} characters long.',
        'string.max': 'Last name cannot exceed {#limit} characters.',
    }),
    dateOfBirth: joi.date().max(currentDate).messages({
        'date.base': 'Date of birth should be a valid date.',
        'date.max': 'Date of birth cannot be in the future.',
    }),
    country: joi.string().messages({
        'string.base': 'Country should be a valid string.',
    }),
    photo: joi.string().messages({
        'string.base': 'Photo should be a valid string.',
    }),
    googleAccount: joi.boolean(),
    memberSince: joi.date().messages({
        'date.base': 'Member since should be a valid date.',
        'any.required': 'Member since is required.',
    }),
    verified: joi.boolean().messages({
        'boolean.base': 'Verified should be a valid boolean value.',
    }),
})

export {
    signUpSchema
}