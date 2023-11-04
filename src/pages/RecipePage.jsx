import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { db } from "../Firebase";
import DOMPurify from "dompurify";
import { PiHandsClappingFill } from "react-icons/pi";
import CommentProvider, { useComment } from "../contexts/commentContext";
import CommentSection from "../components/commentComponents/ReviewSection";
import RatingScorecard from "../components/RatingScorecard";
import { HiStar, HiLogin } from "react-icons/hi";
import { useAuthStatus } from "../hooks/useAuthStatus";
import AddToFavourites from "../components/bookmarkComponents/AddToFavourites";
import { useFavourite } from "../contexts/FavouritesContext";

export default function RecipePage() {
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const { loggedIn, loggedInUser, checkingStatus, lUser } = useAuthStatus();
  const { setBookmarked, user, loadingUser } = useFavourite();
  const param = useParams();
  const navigate = useNavigate();
  const rating = [1, 2, 3, 4, 5];

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const docRef = doc(db, "Recipes", param.recipeId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe(docSnap.data());
          const ratings = docSnap.data().ratings;
          setLoading(false);
          {
            user !== null &&
              user.favourites.some((fav) => fav.id === docSnap.data().id) &&
              setBookmarked(true);
          }
          let sum = 0;
          ratings.rating.forEach((r) => {
            sum += r;
            return sum;
          });
          ratings.rating.length &&
            setRatingAverage(sum / ratings.rating.length);
          {
            loggedInUser !== null &&
              setHasRated(ratings.ratedBy.includes(loggedInUser.displayName));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    {
      !loadingUser && !checkingStatus && fetchRecipe();
    }
  }, [param.recipeId, checkingStatus, loadingUser, user]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="bg-[#e9ffea76] ">
      {/* Header  */}
      <Header />
      <div className=" divide-y-2 divide-[#238C69] px-[146px]">
        <div className="flex flex-row  justify-between py-6 mt-6">
          <div>
            {/* Section 1  */}
            <div className="flex flex-col justify-start  space-y-4 py-6 ">
              <p className="flex flex-row  text-[44px]/[44px] font-bold font-Playfair-Display text-start ">
                {recipe.title}{" "}
                <AddToFavourites
                  imageUrl={recipe.imageUrl}
                  id={param.recipeId}
                />
              </p>
              <div className="bg-white p-2 rounded-full flex flex-row w-fit text-[#238C69] boxShadow">
                <p className="text-base/tight py-1 my-0.5 font-medium">Tags:</p>
                <ul className="flex flex-row w-fit flex-wrap">
                  {recipe.tags.map((tag, index) => (
                    <li
                      key={index}
                      className="drop-shadow-[0_3px_5px_rgba(0,0,0,0.5)] text-base/[18px] mx-2 my-1 px-2 py-1 font-medium bg-white rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-row space-x-5">
                {ratingAverage > 0 && (
                  <div className="bg-white px-2.5 py-1.5 rounded-full flex flex-row w-fit boxShadow">
                    {rating.map((rate, i) => (
                      <HiStar
                        key={i}
                        className={`text-3xl ${
                          rate <= ratingAverage
                            ? "text-[#238C69]"
                            : "text-[#238c69] text-opacity-60"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Section 2  */}
            <div className="flex flex-col space-y-2">
              <p className="text-[32px] font-medium font-Libre-Franklin">
                About the {recipe.title}
              </p>
              <p className="text-base font-normal font-Roboto-Slab w-[550px] text-start ">
                {recipe.overview}
              </p>
            </div>
          </div>
          <img
            src={recipe.imageUrl}
            className="h-96 w-96 ml-12 object-cover rounded-2xl shadow-[-4px_4px_4px_0px_#44614D]"
          />
        </div>
        {/* Section 3: Ingredients */}
        <div className="py-6  ">
          <div className="bg-white rounded-xl p-2 divide-y-[1px] w-[800px] boxShadow">
            <div className="space-y-3 p-3">
              <p className="text-2xl font-medium font-Libre-Franklin">
                The recipe for {recipe.title}
              </p>
              <div>
                <ul className="flex flex-row space-x-8">
                  <li className="flex flex-col justify-center space-y-2 font-Libre-Franklin text-base">
                    <p className="text-[#238C69] font-semibold">Prep Time</p>
                    <p>{recipe.duration.prepTime} mins</p>
                  </li>
                  {recipe.duration.cookTime > 0 && (
                    <li className="flex flex-col justify-center space-y-1 font-Libre-Franklin text-base">
                      <p className="text-[#238C69] font-semibold">Cook Time</p>
                      <p>{recipe.duration.cookTime} mins</p>
                    </li>
                  )}
                  {recipe.servings > 0 && (
                    <li className="flex flex-col justify-center space-y-1 font-Libre-Franklin text-base">
                      <p className="text-[#238C69] font-semibold">Servings</p>
                      <p>{recipe.servings} servings</p>
                    </li>
                  )}
                  {recipe.yield !== "" && (
                    <li className="flex flex-col justify-center space-y-1 font-Libre-Franklin text-base">
                      <p className="text-[#238C69] font-semibold">Yield</p>
                      <p>{recipe.yield}</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="p-3 space-y-3">
              <p className="text-2xl font-medium font-Libre-Franklin text-[#238C69]">
                Ingredients
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index}>{ing}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Section 4: the method  */}
        <div className="flex flex-col justify-start  space-y-5 py-6 ">
          <p className="text-[44px]/[44px] font-bold font-Playfair-Display text-start">
            How to cook it
          </p>
          <ul className="space-y-10 ">
            {recipe.method.map((step, index) => (
              <li key={index} className="flex flex-row justify-between">
                <div className="w-[600px]  space-y-2">
                  <p className="text-2xl font-medium font-Libre-Franklin flex flex-row space-x-3">
                    <p className="text-[#238C69]">{index + 1}. </p>
                    <p>{step.stepTitle}</p>
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(step.stepExplanation),
                    }}
                    className="text-base text-[#104030] font-Roboto font-normal"
                  ></p>
                </div>
                {step.stepImg !== "" && (
                  <div className="rounded-lg">
                    <div className="w-[375px] h-[250px] p-3">
                      <img
                        src={step.stepImg}
                        className=" object-cover  rounded-[2rem] shadow-[-4px_4px_4px_0px_#44614D]"
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Section 5: the result  */}
        <div className="flex flex-row justify-between  space-y-5 py-6 ">
          <div className="flex flex-row px-7">
            <p className="text-[32px]/[32px] font-medium font-Libre-Franklin ">
              Here's the outcome!
            </p>
            <PiHandsClappingFill className="text-4xl iconFlip text-[#238C69] mx-1" />
          </div>
          <img
            src={recipe.result.img}
            className="w-[500px] aspect-[3/2] object-cover rounded-2xl mx-8 shadow-[-4px_4px_4px_0px_#44614D]"
          />
        </div>
      </div>
      {/* Section 6: Reviews */}
      <div className="bg-white px-[146px] divide-y-2 divide-[#238C69]">
        <p className="text-[32px] font-Libre-Franklin font-semibold">
          Review Section
        </p>
        {}
        {loggedIn ? (
          !hasRated && (
            <RatingScorecard
              setHasRated={setHasRated}
              contentPage={"Recipes"}
              paramId={param.recipeId}
            />
          )
        ) : (
          <div className="flex flex-row space-x-1 items-center py-5">
            <p className="text-2xl font-Libre-Franklin font-medium">
              Log in and leave a Review{" "}
            </p>
            <HiLogin
              className="text-2xl text-[#238c69bc] hover:text-[#238C69]"
              onClick={() => navigate("/contact-us")}
            />
          </div>
        )}

        <div>
          <CommentProvider contentPage={"Recipes"} paramId={param.recipeId}>
            <CommentSection />
          </CommentProvider>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
