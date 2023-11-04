import React, { useContext, useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useLocation, useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { toast } from "react-toastify";

const context = React.createContext();
export function useFavourite() {
  return useContext(context);
}

export default function FavouritesProvider({ children }) {
  const { loggedIn, checkingStatus, loggedInUser } = useAuthStatus();
  const [loadingUser, setLoadingUser] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [user, setUser] = useState(null);
  const param = useParams();
  const location = useLocation();

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const docRef = doc(db, "users", loggedInUser.uid);
        const docSnapShot = await getDoc(docRef);
        const fetchedDoc = docSnapShot.data();
        setUser(fetchedDoc);
        setLoadingUser(false);
        console.log("loaded");
      } catch (error) {
        console.log(error);
      }
    }
    !checkingStatus && loggedIn && fetchFavourites();
    loggedIn === false && setLoadingUser(false);
  }, [loggedInUser, loggedIn]);

  async function bookmarkItem(imageUrl, id) {
    try {
      const docRef = doc(db, "users", loggedInUser.uid);
      const fetchedUser = user;
      const item = {
        id: id,
        path: location.pathname,
        itemImgUrl: imageUrl,
      };
      if (!user.favourites.some((fav) => fav.id === item.id)) {
        fetchedUser.favourites.push(item);
        await setDoc(docRef, fetchedUser);
        setBookmarked(true);
        setUser(fetchedUser);
        toast.info("added to bookmark");
      } else {
        const filtered = fetchedUser.favourites.filter((i) => i.id !== item.id);
        fetchedUser.favourites = filtered;
        await setDoc(docRef, fetchedUser);
        setUser(fetchedUser);
        setBookmarked(false);
        toast.info("removed from bookmark");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <context.Provider
      value={{
        loadingUser,
        setBookmarked,
        bookmarked,
        bookmarkItem,
        user,
      }}
    >
      {checkingStatus ? (
        <div className="flex justify-center items-center  py-7">
          <MoonLoader color="#238C69" size={60} speedMultiplier={1} />
        </div>
      ) : (
        children
      )}
    </context.Provider>
  );
}
