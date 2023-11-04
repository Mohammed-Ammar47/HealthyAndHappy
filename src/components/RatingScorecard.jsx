import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { HiStar } from "react-icons/hi";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../Firebase";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function RatingScorecard({ setHasRated, contentPage, paramId }) {
  const rating = [1, 2, 3, 4, 5];
  const [star, setStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { loggedInUser } = useAuthStatus();
  const param = useParams();
  async function submitRating(e) {
    e.preventDefault();
    const docRef = doc(db, contentPage, paramId);
    const docSnapShot = await getDoc(docRef);
    const fetchedRecipe = docSnapShot.data();

    if (!fetchedRecipe.ratings.ratedBy.includes(loggedInUser.displayName)) {
      fetchedRecipe.ratings.ratedBy.push(loggedInUser.displayName);
      fetchedRecipe.ratings.rating.push(selectedRating);
      delete fetchedRecipe.rating;
      setDoc(docRef, fetchedRecipe);
      setHasRated(true);
    } else {
      console.log("already rated");
    }
  }
  return (
    <form
      onSubmit={submitRating}
      className="flex flex-row space-x-3 justify-between items-center"
    >
      <div className="flex flex-row  items-center">
        <p className="text-2xl font-Libre-Franklin font-medium py-5 pr-2">
          How would you rate this recipe?{" "}
        </p>
        {rating.map((rate, i) => (
          <HiStar
            key={i}
            onMouseOver={() => setStar(rate)}
            onMouseLeave={() => setStar(0)}
            onClick={() => setSelectedRating(rate)}
            className={`text-3xl ${
              star == 0
                ? rate <= selectedRating
                  ? "text-[#238C69] transition-transform duration-500 active:scale-[1.75]"
                  : "text-[#238c69] text-opacity-60"
                : rate <= star
                ? "text-[#238C69] transition-transform duration-300 active:scale-[1.5]"
                : "text-[#238c69] text-opacity-60"
            }`}
          />
        ))}
      </div>
      <button
        className={` flex flex-row items-center justify-center space-x-2 h-10 font-Libre-Franklin text-base  bg-[#238C69] font-medium text-white rounded-md  px-2.5   hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2`}
        type="submit"
      >
        <p>Submit</p>
        {submitLoading && (
          <ClipLoader color="white" loading size={16} speedMultiplier={1} />
        )}
      </button>
    </form>
  );
}
