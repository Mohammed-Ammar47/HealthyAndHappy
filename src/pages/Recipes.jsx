import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SelectFilter from "../components/SelectFilter";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import FeaturedRecipes from "../components/FeaturedRecipes";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import FavouritesProvider from "../contexts/FavouritesContext";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState("All");
  const [lastFetchedRecipe, setLastFetchedRecipe] = useState(null);
  const [moreRecipesLeft, setMoreRecipesLeft] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const ref = collection(db, "Recipes");
        const q = query(
          ref,
          selected !== "All" && where("type", "==", selected),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnapshot = await getDocs(q);
        setLastFetchedRecipe(querySnapshot.docs[querySnapshot.docs.length - 1]);
        if (querySnapshot.docs.length === 8) {
          setMoreRecipesLeft(true);
        }
        let queriedRecipes = [];
        querySnapshot.forEach((doc) => {
          queriedRecipes.push(doc.data());
        });
        setRecipes(queriedRecipes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipes();
  }, [selected]);
  async function fetchMoreRecipes() {
    try {
      const ref = collection(db, "Recipes");
      const q = query(
        ref,
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedRecipe),
        limit(8)
      );
      const querySnapshot = await getDocs(q);
      let queriedRecipes = [];
      querySnapshot.forEach((doc) => {
        queriedRecipes.push(doc.data());
      });
      setLastFetchedRecipe(querySnapshot.docs[querySnapshot.docs.length - 1]);
      if (querySnapshot.docs.length !== 8) {
        setMoreRecipesLeft(false);
      }
      setRecipes((prev) => [...prev, ...queriedRecipes]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      className={`w-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/BG1.png?alt=media&token=4743da02-00b8-4637-aa1a-1c15120778cc)] bg-contain sm:bg-cover`}
    >
      <FavouritesProvider>
        <Header />
      </FavouritesProvider>
      {/* Section 1: title  */}
      <div className=" flex flex-col justify-center items-center space-y-5 py-6">
        <p className="text-[44px]/[44px] font-bold font-Playfair-Display text-center ">
          Recipes{" "}
        </p>
        <p className="text-base font-medium font-Roboto-Slab sm:w-96 text-center ">
          Explore and check out meals and you’ll surely find whatever serves you
          needs
        </p>
      </div>

      {/* Section 2: featured  */}
      <FeaturedRecipes page={"Recipes"} />
      {/* Section 3: Recipes  */}
      <div className="px-5 flex flex-col py-12 justify-center divide-y-2 divide-gray-50  sm:px-[102px]">
        <div className="flex flex-row justify-between items-center mb-2 ">
          <p className="text-[22px]/[24px] sm:text-[28px]/[30px] font-medium py-2 ">
            Explore Recipes
          </p>
          <SelectFilter selected={selected} setSelected={setSelected} />
        </div>
        <div className="pt-4">
          <ul className="grid grid-cols-2  sm:grid-cols-4 gap-2 sm:gap-3">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                index={index}
                recipe={recipe}
                page={"recipes"}
              />
            ))}
          </ul>
        </div>
      </div>
      {/* Show More Button */}
      {moreRecipesLeft && (
        <>
          {lastFetchedRecipe && (
            <div className="w-full flex justify-center pb-5">
              <button
                onClick={fetchMoreRecipes}
                className="w-36 font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md  px-2.5  sm:mt-2 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
              >
                Show More{" "}
              </button>{" "}
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
