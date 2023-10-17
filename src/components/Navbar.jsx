import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const pageTitles = [
    { title: "Home", link: "/" },
    { title: "Recipes", link: "/recipes" },
    { title: "Cuisines", link: "/cuisines" },
    { title: "Blogs", link: "/blogs" },
    { title: "About Us", link: "/about-us" },
    { title: "Contact Us", link: "/contact-us" },
  ];
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  if (currentPath !== location.pathname) {
    setCurrentPath(location.pathname);
  }
  return (
    <div>
      <ul className="flex justify-center font-Libre-Franklin items-center boxShadow">
        {pageTitles.map((page, index) => (
          <li
            key={index}
            className={`text-center items-center cursor-pointer h-[46px] leading-[46px] px-[26px] text-lg font-medium ${
              currentPath === page.link
                ? "bg-[#238C69] text-white"
                : "bg-white text-black hover:border-b-[5px] hover:border-[#238C69]"
            }`}
            onClick={() => navigate(page.link)}
          >
            {page.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
