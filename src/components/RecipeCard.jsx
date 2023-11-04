import React from "react";
import { HiStar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe, index, page }) {
  const navigate = useNavigate();
  const rating = [1, 2, 3, 4, 5];
  return (
    <li
      key={index}
      className={`flex flex-col sm:w-[258px] rounded-3xl  bg-white`}
    >
      <div className="sm:w-[258px] rounded-t-3xl   hover:border-2 hover:border-[#238C69] hover:rounded-3xl overflow-hidden transition-transform duration-500">
        <img
          onClick={() => {
            navigate(`/${page}/${recipe.id}`);
          }}
          src={recipe.imageUrl}
          className={` rounded-t-3xl object-cover aspect-[3/2] sm:aspect-square hover:scale-125 transition-transform duration-300 `}
        />
      </div>
      <div
        className={`flex flex-col bg-white px-1.5 sm:px-2 py-2 space-y-1.5 sm:space-y-3 font-Libre-Franklin h-[166] rounded-b-3xl`}
      >
        <p className=" text-base/tight sm:text-2xl/tight  sm:title-truncate font-medium  sm:h-[60px]">
          {recipe.title}
        </p>
        <p className="text-sm sm:text-base font-medium text-[#238C69]">
          {page === "cuisines"
            ? recipe.culture + " " + recipe.type
            : recipe.type}
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
          <div className="flex flex-row space-x-1.5 sm:space-x-2.5">
            <img
              className="w-5 sm:w-7 h-5 sm:h-7"
              src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fhourglass.png?alt=media&token=4d6e32f8-beb4-4c05-bca4-ada71a16c945"
            />
            <p className="text-sm sm:text-base/relaxed">
              {recipe.duration.cookTime + recipe.duration.prepTime} min
            </p>
          </div>
          <div className="justify-center sm text-lg sm:text-[26px] flex flex-row ">
            {rating.map((rate, i) => (
              <HiStar
                key={i}
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
