import { collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../../Firebase";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useFavourite } from "../../contexts/FavouritesContext";
import FavouritesList from "./FavouritesList";

export default function BookmarkSideBar({ openSidebar, setOpenSidebar }) {
  return (
    <aside
      className={`top-0 right-0 z-40 sm:w-[366px] fixed transition-transform duration-300 ${
        openSidebar ? "translate-x-0" : "translate-x-full"
      }  `}
    >
      <div className="h-screen  overflow-y-auto bg-gray-50 border-b-2 border-b-[#238C69] border-l-2 border-l-[#238C69]">
        {/* Sidebar Header */}
        <div className="flex flex-row justify-start items-center space-x-4 px-5 py-3  bg-[#238C69]">
          <AiOutlineClose
            className="text-white text-2xl cursor-pointer  hover:text-[#A5D9C7] focus:text-[#29A67C]"
            onClick={() => {
              setOpenSidebar(false);
            }}
          />
          <p className=" text-lg  font-medium text-white">Bookmark</p>
        </div>
        {/* Sidebar Content */}
        <FavouritesList />
      </div>
    </aside>
  );
}
