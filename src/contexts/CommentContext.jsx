import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";

const context = React.createContext();
export function useComment() {
  return useContext(context);
}

export default function CommentProvider({ children, contentPage, paramId }) {
  const { loggedIn, checkingStatus, loggedInUser } = useAuthStatus();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [hasCommented, setHasCommented] = useState(false);
  const [activeComment, setActiveComment] = useState("");
  const param = useParams();

  // fetch Comments
  useEffect(() => {
    async function fetch() {
      try {
        const docRef = collection(db, contentPage, paramId, "reviews");
        const docSnapShot = await getDocs(docRef);
        let fetchedComments = [];
        docSnapShot.forEach((doc) => {
          if (loggedIn && doc.data().userName == loggedInUser.displayName) {
            setHasCommented(true);
          }

          return fetchedComments.push(doc.data());
        });
        setComments(fetchedComments);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (!checkingStatus) {
      fetch();
    }
  }, [checkingStatus, loggedIn]);

  // Submit Comment
  async function commentSubmit(message) {
    try {
      const docRef = collection(db, contentPage, paramId, "reviews");
      const commentForm = {
        message: message,
        userName: loggedInUser.displayName,
        recipeId: paramId,
        createdAt: serverTimestamp(),
        usersLikedBy: [],
        replies: [],
      };
      await addDoc(docRef, commentForm);
      async function addId() {
        try {
          const q = query(
            docRef,
            where("userName", "==", loggedInUser.displayName)
          );
          const querySnapshot = await getDocs(q);
          const CommentsIds = [];
          querySnapshot.forEach((doc) => {
            return CommentsIds.push(doc.id);
          });
          const CommentsId = CommentsIds[0];

          updateDoc(doc(db, contentPage, paramId, "reviews", CommentsId), {
            id: CommentsId,
          });
          commentForm.id = CommentsId;
          console.log("success");
        } catch (error) {
          console.log(error);
        }
      }
      addId();
      let timestamp = new Date().toISOString();
      commentForm.createdAt = timestamp;
      setComments((prevCom) => [commentForm, ...prevCom]);
      setHasCommented(true);
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
    }
    toast.success("Submitted");
  }

  // Submit Reply
  async function replySubmit(message) {
    try {
      const docRef = doc(db, contentPage, paramId, "reviews", activeComment);
      const docSnapShot = await getDoc(docRef);
      const repliedToComment = docSnapShot.data();

      const replyForm = {
        id: repliedToComment.replies.length,
        message: message,
        userName: loggedInUser.displayName,
        commentId: activeComment,
        repliedTo: docSnapShot.data().userName,
        createdAt: Timestamp.now(),
        usersLikedBy: [],
      };
      repliedToComment.replies.push(replyForm);
      await setDoc(docRef, repliedToComment);
      let timestamp = new Date().toISOString();
      repliedToComment.createdAt = timestamp;
      const refreshedComments = comments.map((comment) => {
        if (comment.id === activeComment) {
          comment = repliedToComment;
        }
        return comment;
      });
      setComments(refreshedComments);
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
    }

    toast.success("Replied");
  }

  // Like Comment
  async function likeComment(id) {
    try {
      const docRef = doc(db, contentPage, paramId, "reviews", id);
      const docSnapShot = await getDoc(docRef);
      const likedDoc = docSnapShot.data();

      if (!likedDoc.usersLikedBy.includes(loggedInUser.displayName)) {
        likedDoc.usersLikedBy.push(loggedInUser.displayName);
        setDoc(docRef, likedDoc);
        comments.map((comment) => {
          if (comment.id === id) {
            comment.usersLikedBy = likedDoc.usersLikedBy;
          }
          return comment;
        });
        console.log("liked");
      } else {
        const filtered = likedDoc.usersLikedBy.filter(
          (user) => user !== loggedInUser.displayName
        );
        likedDoc.usersLikedBy = filtered;
        setDoc(docRef, likedDoc);
        comments.map((comment) => {
          if (comment.id === id) {
            comment.usersLikedBy = filtered;
          }
          return comment;
        });
        console.log("disliked");
      }
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
    }
  }

  // Like Reply
  async function likeReply(id, replyId) {
    try {
      const docRef = doc(db, contentPage, paramId, "reviews", id);
      const docSnapShot = await getDoc(docRef);
      const likedDoc = docSnapShot.data();

      if (
        !likedDoc.replies[replyId].usersLikedBy.includes(
          loggedInUser.displayName
        )
      ) {
        likedDoc.replies[replyId].usersLikedBy.push(loggedInUser.displayName);
        setDoc(docRef, likedDoc);
        comments.map((comment) => {
          if (comment.id === id) {
            comment.replies[replyId].usersLikedBy =
              likedDoc.replies[replyId].usersLikedBy;
          }
          return comment;
        });
        console.log("liked");
      } else {
        const filtered = likedDoc.replies[replyId].usersLikedBy.filter(
          (user) => user !== loggedInUser.displayName
        );
        likedDoc.replies[replyId].usersLikedBy = filtered;
        setDoc(docRef, likedDoc);
        comments.map((comment) => {
          if (comment.id === id) {
            comment.replies[replyId].usersLikedBy = filtered;
          }
          return comment;
        });
        console.log("disliked");
      }
      console.log("done");
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
    }
    // toast.success("Liked");
  }

  // Edit Comment
  async function commentUpdate(message) {
    try {
      const docRef = doc(db, contentPage, paramId, "reviews", activeComment);
      const docSnapShot = await getDoc(docRef);
      const updatedComment = docSnapShot.data();
      updatedComment.message = message;
      updatedComment.usersLikedBy = [];
      await setDoc(docRef, updatedComment);
      comments.map((comment) => {
        if (comment.id === activeComment) {
          comment.message = message;
        }
        return comment;
      });
    } catch (error) {
      console.log(error);
    }
    toast.success("updated");
  }

  // Edit Reply
  async function replyUpdate(message, id) {
    try {
      const docRef = doc(db, contentPage, paramId, "reviews", activeComment);
      const docSnapShot = await getDoc(docRef);
      const updatedComment = docSnapShot.data();
      updatedComment.replies[id].message = message;
      await setDoc(docRef, updatedComment);
      comments.map((comment) => {
        if (comment.id === activeComment) {
          comment.replies.map((reply) => {
            if (reply.id === id) {
              reply.message = message;
            }
            return reply;
          });
        }
        return comment;
      });
    } catch (error) {
      console.log(error);
    }
    toast.success("updated");
  }

  // Delete Comment
  async function commentDelete(id) {
    if (window.confirm("are you sure you want to delete")) {
      const docRef = doc(db, contentPage, paramId, "reviews", id);
      await deleteDoc(docRef);
      const filteredComments = comments.filter((comment) => comment.id !== id);
      setComments(filteredComments);
      setHasCommented(false);
      toast.success("Comment deleted");
    }
  }

  // Delete Reply
  async function replyDelete(id, replyId) {
    if (window.confirm("are you sure you want to delete")) {
      const docRef = doc(db, contentPage, paramId, "reviews", id);
      const docSnapShot = await getDoc(docRef);
      const repliedToComment = docSnapShot.data();
      const filteredReplies = repliedToComment.replies.filter(
        (reply) => reply.id !== replyId
      );
      repliedToComment.replies = filteredReplies;
      await setDoc(docRef, repliedToComment);
      const filteredComments = comments.map((comment) => {
        if (comment.id === id) {
          comment = repliedToComment;
        }
        return comment;
      });
      setComments(filteredComments);
      toast.success("Comment deleted");
    }
  }

  return (
    <context.Provider
      value={{
        rootComments: comments,
        user: loggedInUser,
        hasCommented,
        setActiveComment,
        commentSubmit,
        replySubmit,
        likeComment,
        commentUpdate,
        replyUpdate,
        commentDelete,
        replyDelete,
        activeComment,
        likeReply,
        loggedIn,
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center  py-7">
          <MoonLoader color="#238C69" size={120} speedMultiplier={1} />
        </div>
      ) : (
        children
      )}
    </context.Provider>
  );
}
