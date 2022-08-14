import { makeRequests } from "./makeRequest";

export const createComment = ({ postId, message, parentId }) => {
  return makeRequests(`/posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId },
  });
};
