import Joi from 'joi';

const register = Joi.object().keys({
    userName: Joi.string().min(6).max(24).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(24)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
        .required()
});

const login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(24)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
        .required()
});

export default { register, login };
