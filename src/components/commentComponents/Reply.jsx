import React, { useState } from "react";
import CommentToolBar from "./CommentToolBar";
import TimeAgo from "react-timeago";
import CommentForm from "./CommentForm";
import { useComment } from "../../contexts/CommentContext";

export default function Reply({ reply, runToolBar, user }) {
  const { setActiveComment, replyUpdate, replyDelete, likeReply } =
    useComment();
  const [repState, setRepState] = useState({ ...reply, State: false });
  function editReply(status) {
    setActiveComment(reply.commentId);
    setRepState({ ...reply, State: status });
  }
  function interactWithReply(action) {
    switch (action) {
      case "edit":
        editReply(true);
        break;
      case "like":
        likeReply(reply.commentId, reply.id);
        break;
      case "delete":
        replyDelete(reply.commentId, reply.id);
        break;
      default:
        console.log(`${action}.`);
        break;
    }
  }

  return (
    <>
      <div className="flex flex-col space-y-2 ring-2 ring-[#238C69] rounded-md p-2 my-2 ">
        {!repState.State ? (
          <div className="flex flex-row space-x-1">
            <div
              className={`uppercase w-8 h-8 font-medium flex justify-center items-center rounded-full bg-cyan-700 leading-tight`}
            >
              {reply.userName.split(" ").map((chr) => chr.charAt(0))}
            </div>
            <div className="flex flex-col space-y-2 p-0.5 w-full">
              <div className="flex flex-row justify-between">
                <p className="font-medium">{reply.userName}</p>
                <p className="font-medium">
                  <TimeAgo
                    date={
                      reply.createdAt.seconds
                        ? reply.createdAt?.toDate()
                        : reply.createdAt
                    }
                  />
                  {}
                </p>
              </div>
              <p>{reply.message}</p>
              <CommentToolBar
                useToolBar={runToolBar}
                info={reply}
                interactWithReply={interactWithReply}
              />
            </div>
          </div>
        ) : (
          <CommentForm
            currentMessage={reply.message}
            currentMessageId={reply.id}
            onDiscard={editReply}
            onSubmit={replyUpdate}
          />
        )}
      </div>
    </>
  );
}
