import React, { useState, useEffect } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../Api";
import Comment from "../Components/Comment/Comment";
import CommentForm from "./CommentForm";

function Comments({ currentUserId }) {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = comments.filter((comment) => !comment.parentId);
  const getReplies = (commentId) => {
    return comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    console.log("addComment", text, parentId);
    createCommentApi(text, parentId).then((comment) => {
      setComments([comment, ...comments]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure?")) {
      deleteCommentApi(commentId).then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      });
    }
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, body: text };
          }
          return comment;
        })
      );
      setActiveComment(null);
    });
  };

  useEffect(() => {
    getCommentsApi().then((comments) => {
      setComments(comments);
      console.log(comments);
    });
  }, []);
  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write Comment</div>
      <CommentForm
        currentUserId={currentUserId}
        submitLabel="Comment"
        handleSubmit={addComment}
      />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            addComment={addComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
