import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import SignUpForm from "../components/SignUpForm";
import { useAuthStatus } from "../hooks/useAuthStatus";
import NewsLetterSelection from "../components/NewsLetterSelection";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import FavouritesProvider from "../contexts/FavouritesContext";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { loggedIn, checkingStatus } = useAuthStatus();
  console.log(loggedIn);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: formData.fullName,
        id: user.uid,
      });
      const formDataCopy = { ...formData, id: user.uid };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.subscriptions = [];
      formDataCopy.favourites = [];
      setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Successfully logged in");
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
  }

  if (checkingStatus) {
    return <Spinner />;
  }

  return (
    <div className={`w-screen bg-[#e9ffea76] `}>
      {/* Header  */}
      <FavouritesProvider>
        <Header />
      </FavouritesProvider>{" "}
      <div className="space-y-8 py-6">
        {/* Section 1  */}
        <div className="flex flex-col justify-center items-center space-y-5 ">
          <p className="text-[44px]/[44px] font-bold font-Playfair-Display text-center ">
            H&H Newsletter
          </p>
          <p className="text-base font-medium font-Roboto-Slab w-96 text-center ">
            Join our newsletter and keep yourself updated with our latest
            content, contact about any of your inquiries
          </p>
        </div>
        {/* Section 2  */}
        <div className=" px-48 flex flex-row boxShadow justify-center-center">
          <img
            className="w-[454px] rounded-l-[34px]  "
            src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Ftop-view-american-food-with-copy-space%20(1).jpg?alt=media&token=205a686e-fc0c-4059-838a-5c4d0d1d7669"
          />
          <div className="bg-white w-[454px] p-10 rounded-r-[34px]  space-y-3">
            <div>
              <p className="text-[24px] font-Libre-Franklin font-semibold">
                H&H Newsletter
              </p>
              {loggedIn ? (
                <p className="text-[24px] font-Libre-Franklin font-normal">
                  Sign up and join our newsletter
                </p>
              ) : (
                <p className="text-[24px] font-Libre-Franklin font-normal">
                  Select and Join a newsletter
                </p>
              )}
            </div>
            {!loggedIn ? (
              <>
                <SignUpForm
                  submitForm={submitForm}
                  handleChange={handleChange}
                  formData={formData}
                  loading={loading}
                />
                <div className="w-full flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                  <p className="text-center font-semibold mx-4">OR</p>
                </div>
                <div className=" w-full ">
                  <OAuth />
                </div>
              </>
            ) : (
              <>
                <NewsLetterSelection />
              </>
            )}
          </div>
        </div>
      </div>
      {/* Footer  */}
      <Footer />
    </div>
  );
}
