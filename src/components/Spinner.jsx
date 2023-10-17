import React from "react";
import InfinityLoader from "../assets/InfinityLoader.svg";
import MoonLoader from "react-spinners/MoonLoader";

export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-10 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div>
        {/* <img src={InfinityLoader} alt="Loading..." className="h-96 " /> */}
        <MoonLoader color="#238C69" size={160} speedMultiplier={1} />
      </div>
    </div>
  );
}
