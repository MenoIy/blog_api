export interface IUser {
  _id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  posts: [];
  comments: [];
}

export interface IComment {
  _id: number;
  content: string;
  createdBy: { _id: number; username: string; avatar: string };
  createdAt: Date;
}

export interface IPost {
  _id: number;
  body: string;
  comments: number[];
  createdBy: { _id: number; username: string; avatar: string };
  createdAt: Date;
}
