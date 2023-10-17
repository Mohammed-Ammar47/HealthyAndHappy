import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className=" flex flex-row justify-center space-x-14 items-center py-4 mx-[186px]">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2FH%26H%20Logo.png?alt=media&token=db74118d-1426-4212-b63e-87d60d839826"
        className="h-28 boxShadow"
      />
      <Navbar />
    </div>
  );
}
