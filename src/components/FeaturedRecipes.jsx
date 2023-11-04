import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";
import { db } from "../Firebase";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

export default function FeaturedRecipes({ page }) {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const rating = [1, 2, 3, 4, 5];

  useEffect(() => {
    async function fetchIds() {
      try {
        const q = query(
          collection(db, "featuredContent"),
          where("content", "==", page)
        );
        const querySnapshot = await getDocs(q);
        const featuredItemsIds = querySnapshot.docs[0].data().featuredItems;
        async function fetchRecipes() {
          try {
            const qr = query(
              collection(db, page),
              where("id", "in", featuredItemsIds)
            );
            const recipesQuerySnapshot = await getDocs(qr);
            const queriedFeaturedRecipes = [];
            recipesQuerySnapshot.forEach((doc) => {
              queriedFeaturedRecipes.push(doc.data());
            });
            setFeaturedRecipes(queriedFeaturedRecipes);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        }
        fetchRecipes();
      } catch (error) {
        console.log(error);
      }
    }
    fetchIds();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center ">
          <MoonLoader color="#238C69" size={100} speedMultiplier={1} />
        </div>
      ) : (
        <div className="px-5 flex flex-col py-6 sm:py-12 justify-center divide-y-2 divide-gray-50  sm:px-[102px]">
          <p className="text-[28px]/[28px] sm:text-[32px]/[32px] font-bold font-Playfair-Display text-center pb-4">
            Featured Recipes
          </p>
          <div className="pt-4">
            <ul className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between">
              {featuredRecipes.map((recipe, index) => (
                <li
                  key={index}
                  className={`flex flex-col sm:w-[350px]  rounded-3xl`}
                >
                  <div
                    className={`hover:border-[3px] hover:border-[#238C69]  overflow-hidden transition-transform duration-500 hover:rounded-3xl`}
                  >
                    <img
                      onClick={() => {
                        navigate(`/${page.toLowerCase()}/${recipe.id}`);
                      }}
                      src={recipe.imageUrl}
                      className={` hover:scale-125 transition-transform duration-300 rounded-t-3xl `}
                    />
                  </div>
                  <div
                    className={`flex flex-col bg-white px-3.5 py-2 space-y-3 font-Libre-Franklin h-[166] rounded-b-3xl`}
                  >
                    <p className="text-2xl/tight title-truncate font-medium h-[60px]">
                      {recipe.title}
                    </p>
                    <p className="text-base font-medium text-[#238C69]">
                      {recipe.type}
                    </p>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row space-x-3">
                        <img
                          className="w-7 h-7"
                          src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fhourglass.png?alt=media&token=4d6e32f8-beb4-4c05-bca4-ada71a16c945"
                        />
                        <p className="text-base/relaxed">
                          {recipe.duration.cookTime + recipe.duration.prepTime}{" "}
                          min
                        </p>
                      </div>
                      <div className="text-3xl flex flex-row ">
                        {rating.map((rate, index) => (
                          <HiStar
                            key={index}
                            className={` ${
                              rate <= recipe.rating
                                ? "text-[#238C69]"
                                : "text-[#238c69] text-opacity-60"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
