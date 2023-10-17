import React from "react";
import { HiStar } from "react-icons/hi";

export default function RecipeCard({ recipe, index }) {
  const rating = [1, 2, 3, 4, 5];
  return (
    <li key={index} className={`flex flex-col w-[258px] rounded-3xl  bg-white`}>
      <div className="w-[258px] rounded-t-3xl  hover:border-2 hover:border-[#238C69] hover:rounded-3xl overflow-hidden transition-transform duration-500">
        <img
          src={recipe.imageUrl}
          className={` rounded-t-3xl  hover:scale-125 transition-transform duration-300 `}
        />
      </div>
      <div
        className={`flex flex-col bg-white px-2 py-2 space-y-3 font-Libre-Franklin h-[166] rounded-b-3xl`}
      >
        <p className="text-2xl/tight title-truncate font-medium h-[60px]">
          {recipe.title}
        </p>
        <p className="text-base font-medium text-[#238C69]">{recipe.type}</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-2.5">
            <img
              className="w-7 h-7"
              src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fhourglass.png?alt=media&token=4d6e32f8-beb4-4c05-bca4-ada71a16c945"
            />
            <p className="text-base/relaxed">
              {recipe.duration.cockTime + recipe.duration.cockTime} min
            </p>
          </div>
          <div className="text-[26px] flex flex-row ">
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
  );
}
