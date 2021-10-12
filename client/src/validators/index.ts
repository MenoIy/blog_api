import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup.string().min(6).max(24).required(),
  firstName: yup.string().min(2).max(24).required(),
  lastName: yup.string().min(2).max(24).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .max(24, "Maximum 24 characters")
    .required("Password is required")
    .matches(/^(?=.*?[A-Z])/, "Must contain at least one upper case")
    .matches(/^(?=.*?[0-9])/, "Must contain at least one digit")
    .matches(/^(?=.*?[a-z])/, "Must contain at least one lower case"),
});

export const loginSchema = yup.object({
  username: yup.string().min(6).max(24).required(),
  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .max(24, "Maximum 24 characters")
    .required("Password is required")
    .matches(/^(?=.*?[A-Z])/, "Must contain at least one upper case")
    .matches(/^(?=.*?[0-9])/, "Must contain at least one digit")
    .matches(/^(?=.*?[a-z])/, "Must contain at least one lower case"),
});

export const commentSchema = yup.object({
  content: yup.string().required("cannot send empty comment").max(500),
});

export const postSchema = yup.object({
  content: yup.string().required("cannot send empty post").max(2000),
});
