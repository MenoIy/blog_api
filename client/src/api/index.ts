import axios from "axios";

type loginProps = {
  username: string;
  password: string;
};

type RegisterProps = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

export const login = (loginInfo: loginProps) => {
  return api.post(`/users/login`, loginInfo, { withCredentials: true });
};

export const register = (registerInfo: RegisterProps) => {
  return api.post(`/users/`, registerInfo, { withCredentials: true });
};

export const auth = () => {
  return api.get(`/users/me`, { withCredentials: true });
};

export const getPosts = () => {
  return api.get(`/posts/`, { withCredentials: true });
};

export const fetchComments = (id: number, limit: number) => {
  return api.get(`/posts/${id}/comments?limit=${limit}`, { withCredentials: true });
};

export const postComment = (id: number, comment: { content: string }) => {
  return api.post(`/posts/${id}/comments`, comment, {
    withCredentials: true,
  });
};

export const getUsers = (limit: number) => {
  return api.get(`/users?limit=${limit}`, { withCredentials: true });
};
