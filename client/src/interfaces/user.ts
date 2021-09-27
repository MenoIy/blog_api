import { HexBase64BinaryEncoding } from "crypto";

export interface IUser {
  _id: HexBase64BinaryEncoding;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
