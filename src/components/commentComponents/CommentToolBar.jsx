import React, { useEffect, useState } from "react";
import {
  AiTwotoneHeart,
  AiOutlineHeart,
  AiFillDelete,
  AiTwotoneEdit,
} from "react-icons/ai";
import { BsFillReplyAllFill } from "react-icons/bs";
import { useComment } from "../../contexts/commentContext";
import { Link } from "react-router-dom";

export default function CommentToolBar({
  useToolBar,
  actionOn,
  interactWithReply,
  info,
}) {
  const { user, loggedIn } = useComment();
  const [liked, setLiked] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLikeCount(info.usersLikedBy.length);
    if (loggedIn) {
      if (info.usersLikedBy.includes(user.displayName)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [user, info]);

  function onLike() {
    !liked ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
  }
  function runLikeBtn() {
    setLiked(!liked);
    onLike();
    actionOn === "comment" ? useToolBar("like") : interactWithReply("like");
  }

  return (
    <div className="flex flex-row justify-between text-[#238C69]">
      <div className="flex flex-row space-x-2.5">
        {/* Like button */}
        <div className="flex flex-row space-x-1">
          <div
            onClick={() => {
              loggedIn ? runLikeBtn() : setOpen(!open);
            }}
          >
            {liked ? (
              <AiTwotoneHeart
                className={` text-xl transition-transform duration-500 hover:scale-125 active:scale-[1.75]`}
              />
            ) : (
              <AiOutlineHeart
                className={` text-xl transition-transform duration-500 hover:scale-125 active:scale-[1.75]`}
              />
            )}
          </div>
          {likeCount > 0 && (
            <p className="text-base/[18px]  ">{parseInt(likeCount)}</p>
          )}
        </div>
        {/* Reply button */}
        <span className="relative  cursor-pointer   focus-visible:outline-none">
          <BsFillReplyAllFill
            className="text-xl transition-transform duration-500 hover:scale-125 active:scale-[1.75]"
            onClick={() => {
              loggedIn ? useToolBar("reply") : setOpen(!open);
            }}
          />
          <span
            role="tooltip"
            id="tooltip-05"
            className={` absolute -top-2 left-28 z-10  w-40 -translate-x-1/2 rounded bg-white px-2 py-0.5 text-sm text-black font-medium ring-2 ring-[#238C69] transition-all duration-400 ${
              !open ? "opacity-0   " : "visible block opacity-100 "
            }  `}
          >
            You are not logged in <br /> sign in{" "}
            <Link
              className="text-[#238C69] hover:font-semibold hover:underline"
              to="/contact-us"
            >
              Here
            </Link>
          </span>
        </span>
      </div>
      <div className="flex flex-row space-x-2">
        {loggedIn && info.userName === user.displayName && (
          <>
            {/* Edit button */}
            <AiTwotoneEdit
              className="text-xl transition-transform duration-500 hover:scale-125 active:scale-[1.75]"
              onClick={() => {
                actionOn === "comment"
                  ? useToolBar("edit")
                  : interactWithReply("edit");
              }}
            />
            {/* Delete button */}
            <AiFillDelete
              className="text-xl transition-transform duration-500 hover:scale-125 active:scale-[1.75]"
              onClick={() => {
                actionOn === "comment"
                  ? useToolBar("delete")
                  : interactWithReply("delete");
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
