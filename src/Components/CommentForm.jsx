import React, { useState } from "react";

function CommentForm({
  handleSubmit,
  submitLabel,
  currentUserId,
  initialText = "",
  handleCancel,
  hasCancelButton = false,
}) {
  const [text, setText] = useState(initialText);

  const isDisabled = !text;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
    console.log("onSubmit", text);
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-text-area"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default CommentForm;
