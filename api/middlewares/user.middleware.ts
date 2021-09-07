import { Request, Response, NextFunction ,Application} from "express";
import userValidator from "../validators/user.validator";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidator.createUserValidator.validate(req.body);

  if (!error) return next();
  res.status(400).json({
    error: {
      message: error.message,
    },
  });
};

export default { createUser };