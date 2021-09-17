import Joi from 'joi';

export const addPostSchema = Joi.object().keys({
  body: Joi.string().required()
});

export const getPostByUsernameSchema = Joi.object().keys({
  username: Joi.string().required()
});

export const getPostSchema = Joi.object().keys({
  postId : Joi.string().required().min(24).max(24).hex()
})

export const deletePostSchema = Joi.object().keys({
  postId: Joi.string().required().min(24).max(24).hex()
});

export const updatePostSchema = Joi.object().keys({
  params : {postId : Joi.string().required().min(24).max(24).hex()},
  body : {
    body :  Joi.string().required()
  }
})