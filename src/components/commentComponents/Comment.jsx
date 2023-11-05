import React, { useState } from "react";
import { useComment } from "../../contexts/CommentContext";
import CommentToolBar from "./CommentToolBar";

import TimeAgo from "react-timeago";
import CommentForm from "./CommentForm";
import Reply from "./Reply";

export default function Comment({ comment }) {
  const [replyFormActive, setReplyFormActive] = useState(false);
  const [editFormActive, setEditFormActive] = useState(false);
  const {
    replySubmit,
    setActiveComment,
    likeComment,
    user,
    commentUpdate,
    commentDelete,
  } = useComment();

  function useToolBar(btn) {
    setActiveComment(comment.id);
    switch (btn) {
      case "reply":
        setReplyFormActive(true);
        break;
      case "like":
        likeComment(comment.id);
        break;
      case "delete":
        commentDelete(comment.id);

        break;
      case "edit":
        setEditFormActive(true);
        break;

      default:
        console.log(`${btn}.`);
        break;
    }
  }

  return (
    <div>
      {!editFormActive ? (
        <div className="flex flex-col space-y-2 ring-2 ring-[#238C69] rounded-md p-2">
          <div className="flex flex-row space-x-1">
            <div
              className={`w-10 h-9 font-medium flex justify-center items-center rounded-full bg-cyan-700 leading-tight`}
            >
              FS
            </div>
            <div className="flex flex-col space-y-2 p-0.5 w-full">
              <div className="flex flex-row justify-between">
                <p className="font-medium">{comment.userName}</p>
                <p className="font-medium">
                  <TimeAgo
                    date={
                      comment.createdAt.seconds
                        ? comment.createdAt?.toDate()
                        : comment.createdAt
                    }
                  />
                  {}
                </p>
              </div>
              <p>{comment.message}</p>
              <CommentToolBar
                useToolBar={useToolBar}
                info={comment}
                actionOn={"comment"}
              />
            </div>
          </div>
        </div>
      ) : (
        <CommentForm
          currentMessage={comment.message}
          onSubmit={commentUpdate}
          onDiscard={setEditFormActive}
        />
      )}
      {/* Comment Replies Section */}
      <div className="flex flex-row py-1 transition-opacity  ease-in-out duration-500">
        <div className="w-5 flex items-center  border-l-2  "></div>
        <div className="flex flex-col w-full">
          <ul>
            {comment.replies.map((reply) => (
              <li key={reply.id}>
                <Reply user={user} reply={reply} runToolBar={useToolBar} />
              </li>
            ))}
          </ul>
          {replyFormActive && (
            <CommentForm
              onDiscard={setReplyFormActive}
              onSubmit={replySubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
