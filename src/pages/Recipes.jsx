import React, { useState } from "react";
import Header from "../components/Header";
import SelectFilter from "../components/SelectFilter";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import FeaturedRecipes from "../components/FeaturedRecipes";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const Recipes = [
    {
      title: "River prawn spicy soup",
      type: "Soup",
      duration: 75,
      rating: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2Friver%20prawn%20spicy%20soup.png?alt=media&token=b755f7cc-6a06-492d-8b10-ca20678a06ff",
    },
    {
      title: "Traditional ramadan mix kebab plate",
      type: "Side Dish",
      duration: 30,
      rating: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2Fturkish%20and%20arabic%20traditional%20ramadan%20mix%20kebab%20plate.%20kebab%20adana.png?alt=media&token=985e7af9-a450-4385-9bce-7d89b8d8555a",
    },
    {
      title: "Spicy pide with meat and red pepper ",
      type: "Dinners",
      duration: 60,
      rating: 5,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2FSpicy%20pide%20with%20meat%20and%20red%20pepper.jpg?alt=media&token=d310e80a-e824-45bf-af67-36016a7740c9",
    },
    {
      title: "River prawn spicy soup",
      type: "Soup",
      duration: 75,
      rating: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2Friver%20prawn%20spicy%20soup.png?alt=media&token=b755f7cc-6a06-492d-8b10-ca20678a06ff",
    },
    {
      title: "Traditional ramadan mix kebab plate",
      type: "Side Dish",
      duration: 30,
      rating: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2Fturkish%20and%20arabic%20traditional%20ramadan%20mix%20kebab%20plate.%20kebab%20adana.png?alt=media&token=985e7af9-a450-4385-9bce-7d89b8d8555a",
    },
    {
      title: "Spicy pide with meat and red pepper ",
      type: "Dinners",
      duration: 60,
      rating: 5,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2FSpicy%20pide%20with%20meat%20and%20red%20pepper.jpg?alt=media&token=d310e80a-e824-45bf-af67-36016a7740c9",
    },
  ];
  // if (loading) {
  //   return <Spinner />;
  // }
  return (
    <div
      className={`w-screen bg-[url(https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/BG1.png?alt=media&token=4743da02-00b8-4637-aa1a-1c15120778cc)] bg-cover`}
    >
      <Header />
      {/* Section 1: title  */}
      <div className="flex flex-col justify-center items-center space-y-5 py-6">
        <p className="text-[44px]/[44px] font-bold font-Playfair-Display text-center ">
          Recipes{" "}
        </p>
        <p className="text-base font-medium font-Roboto-Slab w-96 text-center ">
          Explore and check out meals and you’ll surely find whatever serves you
          needs
        </p>
      </div>
      {/* Section 2: featured  */}
      <FeaturedRecipes />
      {/* Section 3: Recipes  */}
      <div className="flex flex-col py-12 justify-center divide-y-2 divide-gray-50  px-[102px]">
        <div className="flex flex-row justify-between items-center mb-2 ">
          <p className="text-[32px]/[30px] py-2">Explore Recipes</p>
          <SelectFilter />
        </div>
        <div className="pt-4">
          <ul className="grid grid-cols-4 gap-3">
            {Recipes.map((recipe, index) => (
              <RecipeCard key={index} index={index} recipe={recipe} />
            ))}
          </ul>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
