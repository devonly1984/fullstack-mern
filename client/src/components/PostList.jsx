import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../services/posts";

const PostList = () => {
  const { loading, error, value: posts } = useAsync(getPosts);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1 className="error-msg">{error}</h1>;

  return (
    posts &&
    posts?.map((post) => {
      return (
        <h1 key={post?.id}>
          <a href={`/posts/${post?.id}`}>{post.title}</a>
        </h1>
      );
    })
  );
};

export default PostList;
