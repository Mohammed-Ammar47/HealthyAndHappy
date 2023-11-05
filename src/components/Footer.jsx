import React, { useState } from "react";
import {
  BsEnvelopeAtFill,
  BsTelephoneFill,
  BsBoxArrowInUpRight,
} from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

export default function Footer() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn, loggedIn, checkingStatus } = useAuthStatus();
  const pageTitles = [
    "Home",
    "Recipes",
    "Cuisines",
    "Blogs",
    "About Us",
    "Contact Us",
  ];

  function logOut() {
    const auth = getAuth();
    auth.signOut();
    setLoggedIn(false);
    toast.success("Successfully logged out");
  }
  function handleChange(e) {
    setMessage(e.target.value);
  }
  if (checkingStatus) {
    return <></>;
  }
  return (
    <>
      <div className="px-5 sm:px-[186px] flex flex-col sm:flex-row justify-center sm:justify-between space-y-7 sm:space-y-0 py-12 bg-[#29613B]">
        {loggedIn ? (
          <div className="flex flex-col space-y-3 sm:space-y-6 text-white">
            <p className="text-2xl font-bold font-Libre-Franklin">Contact us</p>
            <p className="text-2xl font-medium font-Libre-Franklin">
              Send us a message
            </p>
            <div className="flex flex-col">
              <textarea
                className="text-base text-black h-[76px] sm:w-[296px] px-2 p-1 rounded-md focus:outline-[#238C69] focus:outline-2 font-Libre-Franklin shadow-md"
                name="message"
                id="message"
                rows="2"
                value={message}
                onChange={handleChange}
              ></textarea>
              <a href={`mailto:medamr2016@gmail.com?body=${message}`}>
                <button className="font-Libre-Franklin text-base h-8 bg-[#238C69] text-white rounded-md w-fit px-2.5 my-2.5 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69]">
                  Send Message
                </button>
              </a>
              <VscSignOut
                className="bg-white text-emerald-600 hover:ring-emerald-600 hover:ring-2  text-3xl rounded-full p-0.5 active:scale-110"
                onClick={logOut}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 sm:space-y-6 text-white">
            <p className="text-2xl font-bold font-Libre-Franklin">
              Eager to get cooking
            </p>
            <p className="text-2xl font-medium font-Libre-Franklin">
              Sign up to a newsletter
            </p>
            <div className="flex flex-col space-y-2.5 sm:w-[296px] text-base">
              <p>
                Subscribe to our newsletter for updates and to get in touch with
                any questions.
              </p>
            </div>
            <a
              className="flex space-x-2 text-base text-white  w-fit px-2.5 hover:text-[#F53733] hover:cursor-pointer"
              onClick={() => navigate("/newsletter")}
            >
              <p className="font-Libre-Franklin hover:font-semibold hover:underline leading-4">
                See our newsletters
              </p>
              <BsBoxArrowInUpRight className="text-lg" />
            </a>
          </div>
        )}
        <div className="flex flex-col space-y-2 sm:space-y-6 items-start text-white ">
          <p className="text-2xl font-bold font-Libre-Franklin">Sitemap</p>
          <p className="text-xl sm:text-2xl font-medium font-Libre-Franklin">
            All our pages
          </p>
          <ul className="flex flex-col justify-start font-Libre-Franklin px-1.5">
            {pageTitles.map((page, index) => (
              <li key={index} className="text-base">
                - {page}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col space-y-4 text-white w-[296px] items-center font-Libre-Franklin">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2FH%26H%20Logo.png?alt=media&token=db74118d-1426-4212-b63e-87d60d839826"
            className=" h-20 w-20 sm:h-36 sm:w-36 "
          />

          <div className="space-x-4 flex flex-row w-48">
            <BsTelephoneFill />
            <p className="text-white text-base leading-4">888-222-2200</p>
          </div>
          <div className="space-x-4 flex flex-row w-48">
            <BsEnvelopeAtFill />
            <p className="text-white text-base leading-4">email@address.com</p>
          </div>
        </div>
      </div>
      <p className="px-5 sm:px-[186px]  py-2 bg-[#CFE6D7] font-Libre-Franklin">
        CopyRight 2023
      </p>
    </>
  );
}
