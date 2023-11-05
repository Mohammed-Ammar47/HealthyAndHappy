import React, { useEffect, useState } from "react";
import { useFavourite } from "../../contexts/FavouritesContext";
import { TbLayoutGridRemove } from "react-icons/tb";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function FavouritesList() {
  const { user, bookmarkItem } = useFavourite();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    console.log(user);
    if (user !== null) {
      setLoggedIn(true);
    }
  }, [user]);
  return (
    <>
      {!loggedIn ? (
        <p className="m-3 text-2xl">Log in to add to bookmark</p>
      ) : (
        <div className="px-1 py-2">
          {user !== null && (
            <ul className="w-full bg-white  grid grid-cols-2 sm:grid-cols-3 border-gray-400 p-0.5 rounded-lg ">
              {user.favourites.map((favourite, index) => (
                <li key={index} className="w-full boxShadow relative ">
                  <div className="flex items-center p-1 ">
                    <div className=" absolute flex justify-between w-36 sm:w-28 h-36 sm:h-28 p-1 opacity-0 hover:opacity-100 hover:ring-1 hover:ring-[#238C69] hover:bg-black hover:bg-opacity-30 transition-opacity ease-in-out duration-200 rounded-lg">
                      <BsBoxArrowInUpRight
                        onClick={() => navigate(favourite.path)}
                        className="p-1 text-3xl rounded-md text-[#238C69] bg-white hover:bg-[#238C69] hover:text-white active:scale-110 transition-all duration-150 "
                      />
                      <TbLayoutGridRemove
                        onClick={() => {
                          bookmarkItem(favourite.itemImgUrl, favourite.id);
                        }}
                        className="p-1 text-3xl rounded-md text-[#238C69] bg-white hover:bg-[#238C69] hover:text-white active:scale-110 transition-all duration-150 "
                      />
                    </div>
                    <img
                      className="w-36 sm:w-28 h-36 sm:h-28 rounded-lg object-cover"
                      src={favourite.itemImgUrl}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
