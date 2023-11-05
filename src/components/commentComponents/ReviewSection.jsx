import React from "react";
import { useComment } from "../../contexts/CommentContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default function CommentSection() {
  const { rootComments, hasCommented, commentSubmit, loggedIn } = useComment();

  return (
    <div className="flex flex-col sm:p-2">
      <div>
        {loggedIn && (
          <>
            {!hasCommented && (
              <div className="flex flex-col">
                <p className="text-lg sm:text-2xl font-Libre-Franklin font-medium pt-2.5">
                  Add Comment
                </p>
                <CommentForm form={"review"} onSubmit={commentSubmit} />
              </div>
            )}{" "}
          </>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-base sm:text-lg font-Libre-Franklin py-2.5 sm:py-0 sm:px-5">
          {rootComments.length} Comments
        </p>
        <ul className="sm:p-3">
          {rootComments.map((comment, index) => (
            <li key={index}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
