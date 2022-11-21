import React from "react";
import CommentForm from "../CommentForm";
import "./Comment.css";

function Comment({
  comment,
  replies,
  currentUserId,
  deleteComment,
  addComment,
  activeComment,
  setActiveComment,
  parentId = null,
}) {
  const fiveMinutes = 5 * 60 * 1000;
  const timePassed =
    new Date().getTime() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src="assets/userIcon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-author">{comment.username}</div>
        <div>{createdAt}</div>
      </div>
      {!isEditing && <div className="comment-text">{comment.body}</div>}
      {isEditing && (
        <CommentForm
          submitLabel="Edit"
          hasCancelButton
          handleSubmit={(text) => updateComment(text, parentId)}
          initialText={comment.body}
          handleCancel={() => setActiveComment(null)}
        />
      )}
      <div className="comment-actions">
        {canReply && (
          <div
            className="comment-action"
            onClick={() => {
              setActiveComment({ id: comment.id, type: "replying" });
            }}
          >
            Reply
          </div>
        )}
        {canEdit && (
          <div
            className="comment-action"
            onClick={() => {
              setActiveComment({ id: comment.id, type: "editing" });
            }}
          >
            Edit
          </div>
        )}
        {canDelete && (
          <div
            className="comment-action"
            onClick={() => {
              deleteComment(comment.id);
            }}
          >
            Delete
          </div>
        )}
      </div>
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          handleSubmit={(text) => addComment(text, parentId)}
        />
      )}
      {replies.length > 0 && (
        <div className="replies">
          {replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.id}
              replies={[]}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              addComment={addComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              parentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
