import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../services/posts";

const Context = createContext();
export const usePost = () => {
  return useContext(Context);
};
const PostProvider = ({ children }) => {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPost(id), [id]);
  const commentsbyParentid = useMemo(() => {
    const group = {};
    post.comments.forEach((comment) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [post.comments]);
  console.log(commentsbyParentid);
  return (
    <Context.Provider value={{ post: { id, ...post } }}>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
};

export default PostProvider;
