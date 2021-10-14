import Joi from 'joi';

export const createPost = Joi.object().keys({
  body: Joi.string().required()
});

export const getPostByUsername = Joi.object().keys({
  params: { username: Joi.string().required() },
  query: { offset: Joi.number(), limit: Joi.number() }
});

export const getPostbyId = Joi.object().keys({
  postId: Joi.string().required().min(24).max(24).hex()
});

export const deletePost = Joi.object().keys({
  postId: Joi.string().required().min(24).max(24).hex()
});

export const updatePost = Joi.object().keys({
  params: { postId: Joi.string().required().min(24).max(24).hex() },
  body: {
    body: Joi.string().required()
  }
});

export const getPosts = Joi.object().keys({
  offset: Joi.number(),
  limit: Joi.number()
});
