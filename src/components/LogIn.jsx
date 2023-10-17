import React, { useState } from "react";
import Popup from "reactjs-popup";
import { AiOutlineClose, AiOutlineLogin } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export default function LogIn() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setLogInData({ ...logInData, [e.target.name]: e.target.value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const credentials = await signInWithEmailAndPassword(
        auth,
        logInData.email,
        logInData.password
      );
      if (credentials.user) {
        toast.success("Successfully logged in");
      }
    } catch (error) {
      console.log(error);
      toast.error("error occurred");
    }
  }
  return (
    <Popup
      trigger={
        <button className="flex flex-row items-center font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md w-full px-2.5  hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2">
          <AiOutlineLogin className="text-[33px] p-1" />
          <p>Log in</p>
        </button>
      }
      modal
    >
      {(close) => (
        <div className="px-4 py-3 divide-y-2">
          <div className="flex flex-row justify-between ">
            <p className="text-xl pb-1 font-medium">Log in</p>
            <AiOutlineClose
              className="text-2xl ring-2 rounded-md ring-[#238C69] hover:text-[#238C69]"
              onClick={close}
            />
          </div>
          <form className="space-y-2.5 text-base p-2" onSubmit={onSubmit}>
            <div className="space-y-2 flex flex-col w-full">
              <label className="font-medium">Email</label>
              <input
                className="boxShadow p-1 rounded-md  focus:ring-2 focus:ring-[#238C69] outline-none appearance-none"
                name="email"
                type="email"
                value={logInData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 flex flex-col w-full pb-2">
              <label className="font-medium">Password</label>
              <input
                className="boxShadow p-1 rounded-md  focus:ring-2 focus:ring-[#238C69] outline-none appearance-none"
                name="password"
                type="password"
                value={logInData.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md w-full px-2.5   hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}
