import { IUserDocument } from "./api/interfaces/user.interface";

declare global {
    namespace Express {
        interface Request {
            user: IUserDocument;
            token: string;
        }
    }
}