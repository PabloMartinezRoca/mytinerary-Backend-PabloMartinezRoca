import joi from 'joi'
import joiOid from 'joi-oid'
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

const signUpSchema = joi.object({
    email: joi.string().required().email().messages({
        'string.base': 'Email should be a valid string.',
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
    }).label('email'),
    pass: joiPwd(complexityOptions).messages({
        'passwordComplexity.base': 'Password should meet the complexity requirements.',
        'passwordComplexity.tooShort': 'Password must be at least {#limit} characters long.',
        'passwordComplexity.tooLong': 'Password cannot exceed {#limit} characters.',
        'passwordComplexity.lowercase': 'Password should contain at least {#limit} lowercase letter(s).',
        'passwordComplexity.uppercase': 'Password should contain at least {#limit} uppercase letter(s).',
        'passwordComplexity.numeric': 'Password should contain at least {#limit} numeric character(s).',
        'passwordComplexity.symbol': 'Password should contain at least {#limit} special character(s).',
    }).label('Password'),
    firstName: joi.string().required().min(2).max(32).messages({
        'string.base': 'First name should be a valid string.',
        'string.empty': 'First name is required.',
        'string.min': 'First name must be at least {#limit} characters long.',
        'string.max': 'First name cannot exceed {#limit} characters.',
    }).label('First Name'),
    lastName: joi.string().required().min(2).max(32).messages({
        'string.base': 'Last name should be a valid string.',
        'string.empty': 'Last name is required.',
        'string.min': 'Last name must be at least {#limit} characters long.',
        'string.max': 'Last name cannot exceed {#limit} characters.',
    }).label('Last Name'),
    dateOfBirth: joi.date().max(currentDate).messages({
        'date.base': 'Date of birth should be a valid date.',
        'date.max': 'Date of birth cannot be in the future.',
    }).label('Date of Birth'),
    photo: joi.string().required().uri({
        scheme: [
          'http',
          'https',
          'ftp',
          'sftp',
          'data',
          'file',
          'git',
          /git\+https?/,
          /https?:/,
        ],
      })
      /* .regex(/\.(jpg|webp|jpeg|png|gif|bmp)$/i) */
      .label('URL Profile Photo')
      .messages({
        'string.base': 'The {{#label}} field must be valid.',
        'string.pattern.base': 'The {{#label}} field does not match with a valid URL address.',
        'string.uri.scheme': 'The {{#label}} field does not match with a valid URL address.',
        'string.empty': 'The {{#label}} field cannot be empty.',
        'string.uri': 'The {{#label}} field must be a valid URI.',
        'any.required': 'The {{#label}} field is required.',
    }),
    country: joiOid.string().messages({
        'string.empty': 'Select your Country.',
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