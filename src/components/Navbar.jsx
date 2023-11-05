import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Navbar() {
  const param = useParams();
  const pageTitles = [
    { title: "Home", link: "/" },
    {
      title: "Recipes",
      link: "/recipes",
      childLink: `/recipes/${param.recipeId}`,
    },
    {
      title: "Cuisines",
      link: "/cuisines",
      childLink: `/cuisines/${param.cuisineId}`,
    },
    { title: "Blogs", link: "/blogs", childLink: `/blogs/${param.blogId}` },
    { title: "About Us", link: "/about-us" },
    { title: "Newsletter", link: "/newsletter" },
  ];
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (currentPath !== location.pathname) {
    setCurrentPath(location.pathname);
  }
  return (
    <div className="sm:order-2 ">
      <button
        onClick={() => {
          setOpen(!open);
        }}
        type="button"
        className="visible sm:hidden boxShadow mt-[1px] rounded-sm items-center p-1.5 bg-white border-gray-50 hover:ring-2 hover:ring-[#238C69] hover:ring-opacity-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#238C69] active:ring-[#238C69] transition ease-in-out duration-200"
      >
        <AiOutlineMenu
          className="text-[30px] text-[#238C69]"
          src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fbookmark.png?alt=media&token=18d7a640-8475-4ecb-a6d8-a3e764aacefe"
        />
      </button>

      <ul
        className={`${
          open
            ? "translate-x-0 sm:translate-x-0"
            : "-translate-x-full sm:translate-x-0"
        }  z-10 md:visible right-0 top-0 w-screen sm:w-fit absolute sm:relative flex flex-col sm:flex-row justify-start sm:justify-center font-Libre-Franklin sm:items-center boxShadow transition-transform duration-300`}
      >
        <div className="flex sm:hidden justify-end items-center p-3.5 border-b-2 border-b-[#238C69] bg-white">
          <AiOutlineClose
            className="text-white bg-[#238C69] p-1 rounded-full text-3xl cursor-pointer hover:bg-white hover:text-[#29A67C] focus:text-[#29A67C] ring-2 ring-[#238C69]"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        {pageTitles.map((page, index) => (
          <li
            key={index}
            className={`text-start sm:text-center items-center cursor-pointer h-[46px] leading-[46px] px-[20px] text-lg  font-medium ${
              currentPath === page.link || currentPath === page.childLink
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
