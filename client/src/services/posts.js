import { makeRequests } from "./makeRequest";

export const getPosts = () => {
  return makeRequests("/posts");
};
export const getPost = (id) => {
  return makeRequests(`/posts/${id}`);
};
