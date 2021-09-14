import Joi from 'joi';

const register = Joi.object().keys({
  userName: Joi.string().min(6).max(24).alphanum().required(),
  firstName: Joi.string().min(2).max(24).alphanum().required(),
  lastName: Joi.string().min(2).max(24).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(24)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
    .required()
});

const login = Joi.object().keys({
  userName: Joi.string().min(6).max(24).alphanum().required(),
  password: Joi.string()
    .min(8)
    .max(24)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
    .required()
});

const update = Joi.object()
  .keys({
    userName: Joi.string().min(6).max(24).alphanum(),
    firstName: Joi.string().min(6).max(24).alphanum(),
    lastName: Joi.string().min(6).max(24).alphanum(),
    email: Joi.string().email(),
    password: Joi.string()
      .min(8)
      .max(24)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
  })
  .or('userName', 'firstName', 'lastName', 'email', 'password');

export default { register, login, update };
