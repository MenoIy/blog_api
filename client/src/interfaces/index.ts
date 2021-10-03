export interface IUser {
  _id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IComment {
  _id: number;
  content: string;
  createdBy: { _id: number; username: string };
  createdAt: Date;
}

export interface IPost {
  _id: number;
  body: string;
  comments: number[];
  createdBy: { _id: number; username: string };
  createdAt: Date;
}
