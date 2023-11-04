import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";

export default function SelectFilter({ setSelected, selected, page }) {
  const [open, setOpen] = useState(false);
  const options = [
    { title: "All" },
    { title: "Lunch" },
    { title: "Dinner" },
    { title: "Breakfast" },
    { title: "Salad" },
    { title: "Dessert" },
    { title: "Drinks" },
  ];
  const cuisinesOptions = [
    { title: "All" },
    { title: "Indian" },
    { title: "Turkish" },
    { title: "Mexican" },
    { title: "Chinese" },
    { title: "Italian" },
  ];
  return (
    <div>
      {/*<!-- Component: Rounded base basic select --> */}
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={`flex z-10 text-[#238C69] relative items-center w-fit rounded-full py-1 bg-white px-1.5 sm:px-4 text-base sm:text-xl font-medium font-Libre-Franklin ${
          open && "ring-2 ring-[#238C69]"
        }`}
      >
        <p>{selected}</p>
        <img
          className={`h-3.5 sm:h-5 px-2 transition-transform duration-300 ${
            open ? "-rotate-90" : "rotate-90"
          }`}
          src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fnext.png?alt=media&token=be40c570-c449-437f-9299-83bb7b6c4b90"
        />
      </button>
      <div className="relative flex justify-end ">
        <ul
          className={` top-1 absolute items-center   bg-white w-40 rounded-xl border-2 border-[#238C69] py-1  transition-opacity ease-in-out duration-500 ${
            open ? " opacity-100 z-50" : "opacity-0 -z-20  "
          }`}
        >
          {page === "cuisines"
            ? cuisinesOptions.map((option, i) => (
                <li
                  key={i}
                  className="flex justify-between cursor-pointer text-sm sm:text-base font-medium hover:text-white hover:bg-[#238C69] py-1 px-3"
                  onClick={() => {
                    setSelected(option.title);
                  }}
                >
                  <p>{option.title}</p>
                  {option.title === selected && (
                    <HiCheck className="text-xl text-[#238C69] " />
                  )}
                </li>
              ))
            : options.map((option, i) => (
                <li
                  key={i}
                  className="flex justify-between cursor-pointer  sm:text-base font-medium hover:text-white hover:bg-[#238C69] py-1 px-3"
                  onClick={() => {
                    setSelected(option.title);
                  }}
                >
                  <p>{option.title}</p>
                  {option.title === selected && (
                    <HiCheck className="text-xl text-[#238C69] " />
                  )}
                </li>
              ))}
        </ul>
      </div>
      {/*<!-- End Rounded base basic select --> */}
    </div>
  );
}
