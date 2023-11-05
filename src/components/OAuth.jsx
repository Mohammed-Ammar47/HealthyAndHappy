import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import {
  AiFillTwitterCircle,
  AiFillGoogleCircle,
  AiOutlineLogin,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import LogIn from "./LogIn";

export default function OAuth() {
  const auth = getAuth();

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credentials = await signInWithPopup(auth, provider);
      const user = credentials.user;
      updateProfile(auth.currentUser, {
        fullName: user.displayName,
        id: user.uid,
      });
      const userData = {
        id: user.uid,
        fullName: user.displayName,
        email: user.email,
        subscriptions: [],
        favourites: [],
      };
      userData.timestamp = serverTimestamp();
      setDoc(doc(db, "users", user.uid), userData);
      toast.success("Successfully logged in");
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
    }
  }

  return (
    <div className="flex flex-row justify-between space-x-1.5 px-3">
      <button
        className="flex flex-row items-center font-Libre-Franklin text-base h-10 bg-[#BF2015] font-medium text-white rounded-md w-full px-2.5  hover:bg-white hover:text-[#BF2015] hover:ring-2 hover:ring-[#BF2015] active:ring-offset-2"
        onClick={signInWithGoogle}
      >
        <AiFillGoogleCircle className="text-4xl p-1" />
        <p>Google</p>
      </button>

      <LogIn />
    </div>
  );
}
