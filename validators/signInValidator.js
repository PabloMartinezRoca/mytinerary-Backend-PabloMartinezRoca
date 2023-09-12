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

const signInSchema = joi.object({
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
})

export {
    signInSchema
}