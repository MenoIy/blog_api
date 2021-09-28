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

const url: string = "http://localhost:5000";

export const login = (loginInfo: loginProps) => {
  return axios.post(`${url}/users/login`, loginInfo, { withCredentials: true });
};

export const register = (registerInfo: RegisterProps) => {
  return axios.post(`${url}/users/`, registerInfo);
};

export const auth = () => {
  return axios.get(`${url}/users/me`, { withCredentials: true });
};

export const getPosts = () => {
  return axios.get(`${url}/posts/`);
};

export const getComments = (id: string, limited: boolean) => {
  if (limited) return axios.get(`${url}/posts/${id}/comments?limit=3`);
  return axios.get(`${url}/posts/${id}/comments`);
};

export const addComment = (id: string, comment: { content: string }) => {
  return axios.post(`${url}/posts/${id}/comments`, comment, {
    withCredentials: true,
  });
};

export const getUsers = (limit: number) => {
  return axios.get(`${url}/users?limit=${limit}`);
};
