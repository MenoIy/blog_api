import { Request, Response, NextFunction } from "express";
import userModel, {IUser} from '../models/user.model'


const create = async (req : Request, res : Response, next : NextFunction) => {
    const user : IUser = new userModel(req.body)
    await user.save();
    next();
}

export default {create}