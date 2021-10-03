import Joi from 'joi';

export const createUser = Joi.object().keys({
  username: Joi.string().min(6).max(24).alphanum().required(),
  firstName: Joi.string().min(2).max(24).alphanum().required(),
  lastName: Joi.string().min(2).max(24).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(24)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
    .required()
});

export const loginUser = Joi.object().keys({
  username: Joi.string().min(6).max(24).alphanum().required(),
  password: Joi.string()
    .min(8)
    .max(24)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
    .required()
});

export const updateUser = Joi.object()
  .keys({
    username: Joi.string().min(6).max(24).alphanum(),
    firstName: Joi.string().min(6).max(24).alphanum(),
    lastName: Joi.string().min(6).max(24).alphanum(),
    email: Joi.string().email(),
    password: Joi.string()
      .min(8)
      .max(24)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/)
  })
  .or('username', 'firstName', 'lastName', 'email', 'password');

export const getUserByUsername = Joi.object().keys({
  username: Joi.string().min(6).max(24).alphanum().required()
});

export const verifyEmail = Joi.object().keys({
  token: Joi.string().required()
});

export const getUsersQuery = Joi.object().keys({
  limit: Joi.number()
  //more query
});
