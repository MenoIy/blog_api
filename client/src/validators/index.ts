import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup.string().min(6).max(24).required(),
  firstName: yup.string().min(2).max(24).required(),
  lastName: yup.string().min(2).max(24).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(24)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
      "Must Contain 8 Characters, One Number"
    ),
});

export const loginSchema = yup.object({
  username: yup.string().min(6).max(24).required(),
  password: yup
    .string()
    .min(8)
    .max(24)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/,
      "Must contain 8 characters, one number"
    ),
});
