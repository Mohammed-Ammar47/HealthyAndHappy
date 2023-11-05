import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../Firebase";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { useFavourite } from "../../contexts/FavouritesContext";

export default function AddToFavourites({ imageUrl, id }) {
  const { bookmarked, bookmarkItem } = useFavourite();

  return (
    <div
      onClick={() => bookmarkItem(imageUrl, id)}
      className="flex flex-row items-center justify-center text-[32px] px-1 pt-3 sm:pt-0"
    >
      {bookmarked ? (
        <BsBookmarkStarFill className="text-[#238C69] transform transition-all ease-in-out hover:scale-110 active:scale-150 duration-500" />
      ) : (
        <BsBookmarkStar className="text-[#238C69] transform transition-all ease-in-out hover:scale-110 active:scale-150 duration-500" />
      )}
    </div>
  );
}
