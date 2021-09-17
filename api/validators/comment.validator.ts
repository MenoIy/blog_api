import Joi, { string } from 'joi'

export const addCommentSchema = Joi.object().keys({
    body : {
        content : Joi.string().required()
    },
    params : {
        postId : Joi.string().required().min(24).max(24).hex()
    }
})

export const getCommentsSchema = Joi.object().keys({
    postId : Joi.string().required().min(24).max(24).hex()
})

export const getCommentSchema = Joi.object().keys({
    commentId :Joi.string().required().min(24).max(24).hex()
})

export const updateCommentSchema = Joi.object().keys({
    body : {
        content : Joi.string().required()
    },
    params : {
        commentId :Joi.string().required().min(24).max(24).hex()
    }
})

export const deleteCommentSchema = Joi.object().keys({
    commentId :Joi.string().required().min(24).max(24).hex()
})