import React, { useState } from "react";
import Navbar from "./Navbar";
import BookmarkSideBar from "./bookmarkComponents/BookmarkSideBar";
import FavouritesProvider, {
  useFavourite,
} from "../contexts/FavouritesContext";

export default function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className=" flex flex-row justify-between  items-center py-4 mx-5 sm:mx-[186px]">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2FH%26H%20Logo.png?alt=media&token=db74118d-1426-4212-b63e-87d60d839826"
          className="h-20 sm:h-28 boxShadow order-1	"
        />
        <Navbar />
        <button
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
          type="button"
          className="order-3 boxShadow mt-[1px] rounded-sm items-center p-1.5 bg-white border-gray-50 hover:ring-2 hover:ring-[#238C69] hover:ring-opacity-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#238C69] active:ring-[#238C69] transition ease-in-out duration-200"
        >
          <img
            className="w-8 h-8 "
            src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fbookmark.png?alt=media&token=18d7a640-8475-4ecb-a6d8-a3e764aacefe"
          />
        </button>
      </div>

      <BookmarkSideBar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
    </>
  );
}
