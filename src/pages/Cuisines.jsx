import React, { useEffect, useState } from "react";
import SelectFilter from "../components/SelectFilter";
import RecipeCard from "../components/RecipeCard";
import FeaturedRecipes from "../components/FeaturedRecipes";
import Header from "../components/Header";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Spinner from "../components/Spinner";
import FavouritesProvider from "../contexts/FavouritesContext";
import Footer from "../components/Footer";
import { db } from "../Firebase";

export default function Cuisines() {
  const [cuisines, setCuisines] = useState([]);
  //   const [selected, setSelected] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [lastFetchedCuisine, setLastFetchedCuisine] = useState(null);
  const [moreCuisinesLeft, setMoreCuisinesLeft] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const ref = collection(db, "Cuisines");
        const q = query(
          ref,

          selectedCuisine !== "All" && where("culture", "==", selectedCuisine),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnapshot = await getDocs(q);
        setLastFetchedCuisine(
          querySnapshot.docs[querySnapshot.docs.length - 1]
        );
        if (querySnapshot.docs.length === 8) {
          setMoreCuisinesLeft(true);
        }
        let queriedCuisines = [];
        querySnapshot.forEach((doc) => {
          queriedCuisines.push(doc.data());
        });
        console.log(lastFetchedCuisine);
        setCuisines(queriedCuisines);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecipes();
  }, [selectedCuisine]);
  async function fetchMoreRecipes() {
    try {
      const ref = collection(db, "Cuisines");
      const q = query(
        ref,
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedCuisine),
        limit(8)
      );
      const querySnapshot = await getDocs(q);
      let queriedCuisines = [];
      querySnapshot.forEach((doc) => {
        queriedCuisines.push(doc.data());
      });
      setLastFetchedCuisine(querySnapshot.docs[querySnapshot.docs.length - 1]);
      if (querySnapshot.docs.length !== 8) {
        setMoreCuisinesLeft(false);
      }
      setCuisines((prev) => [...prev, ...queriedCuisines]);
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
      className={`w-screen sm:bg-[url(https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2FBG.png?alt=media&token=eaa1bdc5-653d-4949-b142-a213705d6013)] bg-[#e9ffea] bg-contain sm:bg-cover`}
    >
      <FavouritesProvider>
        <Header />
      </FavouritesProvider>
      {/* Section 1: title  */}
      <div className="flex flex-col justify-center items-center space-y-5 py-6">
        <p className="text-4xl/9 sm:text-[44px]/[44px] font-bold font-Playfair-Display text-center ">
          Cuisines{" "}
        </p>
        <p className="text-sm font-medium font-Roboto-Slab sm:w-96 text-center">
          Discover and savor the diverse culinary traditions of cultures
          worldwide, savoring flavors you may have never imagined.
        </p>
      </div>

      {/* Section 2: featured  */}
      <FeaturedRecipes page={"Cuisines"} />
      {/* Section 3: Recipes  */}
      <div className="px-5 flex flex-col py-12 justify-center divide-y-2 divide-[#238C69] sm:px-[102px]">
        <div className="flex flex-row justify-between items-center mb-2 ">
          <p className="text-[22px]/[24px] sm:text-[28px]/[30px] font-medium py-2  font-Playfair-Display">
            Explore Cuisines
          </p>
          <div className="flex flex-row justify-between space-x-2">
            <SelectFilter
              selected={selectedCuisine}
              setSelected={setSelectedCuisine}
              page={"cuisines"}
            />
            {/* <SelectFilter selected={selected} setSelected={setSelected} /> */}
          </div>
        </div>
        <div className="pt-4">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {cuisines.map((cuisine, index) => (
              <RecipeCard
                key={index}
                index={index}
                recipe={cuisine}
                page={"cuisines"}
              />
            ))}
          </ul>
        </div>
      </div>
      {/* Show More Button */}
      {moreCuisinesLeft && (
        <>
          {lastFetchedCuisine && (
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
