import IconButton from "./IconButton";
import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import CommentList from "./CommentList";
import { useState } from "react";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
const Comment = ({ id, message, user, createdAt }) => {
  const { getReplies } = usePost();

  const childComments = getReplies(id);
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>

        <div className="message">{message}</div>
        <div className="footer">
          <IconButton aria-label="Like" Icon={FaHeart}>
            2
          </IconButton>
          <IconButton aria-label="Reply" Icon={FaReply} />
          <IconButton aria-label="Edit" Icon={FaEdit} />
          <IconButton aria-label="Delete" Icon={FaTrash} color="danger" />
        </div>
      </div>
      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack 
             ${areChildrenHidden ? "hide" : ""}`}
          >
            <button
              aria-label="Hide Replies"
              className="collapse-line"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden}
          ></button>
        </>
      )}
    </>
  );
};

export default Comment;
