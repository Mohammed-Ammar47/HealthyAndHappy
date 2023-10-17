import React from "react";
import { HiStar } from "react-icons/hi";

export default function FeaturedRecipes() {
  const rating = [1, 2, 3, 4, 5];
  const featuredRecipes = [
    {
      id: 0,
      title: "River prawn spicy soup",
      type: "Soup",
      duration: 75,
      rating: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2Friver%20prawn%20spicy%20soup.png?alt=media&token=b755f7cc-6a06-492d-8b10-ca20678a06ff",
    },
    {
      id: 1,
      title: "Traditional ramadan mix kebab plate",
      type: "Side Dish",
      duration: 30,
      rating: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2Fturkish%20and%20arabic%20traditional%20ramadan%20mix%20kebab%20plate.%20kebab%20adana.png?alt=media&token=985e7af9-a450-4385-9bce-7d89b8d8555a",
    },
    {
      id: 2,
      title: "Spicy pide with meat and red pepper ",
      type: "Dinners",
      duration: 60,
      rating: 5,
      img: "https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Recipes%2FSpicy%20pide%20with%20meat%20and%20red%20pepper.jpg?alt=media&token=d310e80a-e824-45bf-af67-36016a7740c9",
    },
  ];
  return (
    <div className="flex flex-col py-12 justify-center divide-y-2 divide-gray-50  px-[102px]">
      <p className="text-[32px]/[32px] font-bold font-Playfair-Display text-center pb-4">
        Featured Recipes
      </p>
      <div className="pt-4">
        <ul className="flex flex-row justify-between">
          {featuredRecipes.map((recipe, index) => (
            <li key={index} className={`flex flex-col w-[350px]`}>
              <img
                src={recipe.img}
                className={` ${
                  !(recipe.id % 2) &&
                  (recipe.id == 0 ? "rounded-tl-3xl" : "rounded-tr-3xl")
                }`}
              />
              <div
                className={`flex flex-col bg-white px-3.5 py-2 space-y-3 font-Libre-Franklin h-[166] ${
                  !(recipe.id % 2) &&
                  (recipe.id == 0 ? "rounded-bl-3xl" : "rounded-br-3xl")
                }`}
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
                    <p className="text-base/relaxed">{recipe.duration}min</p>
                  </div>
                  <div className="text-3xl flex flex-row ">
                    {rating.map((rate) => (
                      <HiStar
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
  );
}
