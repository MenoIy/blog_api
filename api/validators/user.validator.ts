import Joi from 'joi'

const createUserValidator = Joi.object().keys({
    firstName: Joi.string()
        .min(2)
        .max(24)
        .alphanum()
        .required(),
    lastName: Joi.string()
        .min(2)
        .max(24)
        .alphanum()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .max(24)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
        .required()
});

export default {createUserValidator}