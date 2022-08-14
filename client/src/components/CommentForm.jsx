import { useState } from "react";

const CommentForm = ({
  initialValue = "",
  loading,
  error,
  onSubmit,
  autoFocus = false,
}) => {
  const [message, setMessage] = useState(initialValue);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(initialValue));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus={autoFocus}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
};

export default CommentForm;
