import Joi from 'joi';

export const createComment = Joi.object().keys({
  body: {
    content: Joi.string().required()
  },
  params: {
    postId: Joi.string().required().min(24).max(24).hex()
  }
});

export const getComments = Joi.object().keys({
  params: {
    postId: Joi.string().required().min(24).max(24).hex()
  },
  query: {
    offset: Joi.number(),
    limit: Joi.number()
  }
});

export const getComment = Joi.object().keys({
  commentId: Joi.string().required().min(24).max(24).hex()
});

export const updateComment = Joi.object().keys({
  body: {
    content: Joi.string().required()
  },
  params: {
    commentId: Joi.string().required().min(24).max(24).hex()
  }
});

export const deleteComment = Joi.object().keys({
  commentId: Joi.string().required().min(24).max(24).hex()
});
