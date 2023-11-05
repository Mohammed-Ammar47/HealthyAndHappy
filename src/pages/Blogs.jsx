import React, { useEffect, useState } from "react";
import FavouritesProvider from "../contexts/FavouritesContext";
import Header from "../components/Header";
// [#e9ffea76]
import Footer from "../components/Footer";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState("");
  const [lastFetchedBlog, setLastFetchedBlog] = useState(null);
  const [moreBlogsLeft, setMoreBlogsLeft] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const types = ["Cooking Tips", "Food & Nutrition", "Ingredients Spotlights"];
  function handleSelection(filterItem) {
    if (selected === "" || selected !== filterItem) {
      setSelected(filterItem);
    } else {
      setSelected("");
    }
  }
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const ref = collection(db, "Blogs");
        const q = query(
          ref,
          selected !== "" && where("type", "==", selected),
          orderBy("timestamp", "desc"),
          limit(6)
        );
        const querySnapshot = await getDocs(q);
        setLastFetchedBlog(querySnapshot.docs[querySnapshot.docs.length - 1]);
        if (querySnapshot.docs.length === 6) {
          setMoreBlogsLeft(true);
        }
        let queriedBlogs = [];
        querySnapshot.forEach((doc) => {
          queriedBlogs.push(doc.data());
        });
        setBlogs(queriedBlogs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, [selected]);
  async function fetchMoreBlogs() {
    try {
      const ref = collection(db, "Blogs");
      const q = query(
        ref,
        selected !== "" && where("type", "==", selected),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedBlog),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      let queriedBlogs = [];
      querySnapshot.forEach((doc) => {
        queriedBlogs.push(doc.data());
      });
      setLastFetchedBlog(querySnapshot.docs[querySnapshot.docs.length - 1]);
      if (querySnapshot.docs.length !== 6) {
        setMoreBlogsLeft(false);
      }
      setBlogs((prev) => [...prev, ...queriedBlogs]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={`w-screen bg-[#e9ffea]`}>
      <FavouritesProvider>
        <Header />
      </FavouritesProvider>
      {/* Section 1: title  */}
      <div className="px-5 flex flex-col justify-center items-center space-y-5 py-6">
        <p className="text-4xl/9 sm:text-[44px]/[44px] font-bold font-Playfair-Display text-center">
          Our Blogs{" "}
        </p>
        <p className="text-sm sm:text-base font-medium font-Roboto-Slab sm:w-96 text-center">
          Explore and check out our articles and read about cooking and food
          related topics
        </p>
      </div>
      {/* Section 2: featured  */}
      <div className="flex flex-col sm:flex-row my-6 sm:my-12 bg-white mx-5 sm:mx-[102px] boxShadow rounded-3xl sm:rounded-l-3xl">
        <div className=" overflow-hidden rounded-t-3xl sm:rounded-r-none sm:rounded-l-3xl sm:w-[465px]">
          <img
            onClick={() => navigate(`/blogs/${blogs[0].id}`)}
            src={blogs[0].imageUrl}
            className={` sm:h-[310px] sm:w-[465px] hover:scale-125 transition-transform duration-300 `}
          />
        </div>
        <div className="flex flex-col sm:w-[610px] space-y-3 p-2.5 sm:p-11 ">
          <p className="text-2xl/tight sm:text-2xl/tight flex flex-wrap sm:title-truncate font-medium font-Libre-Franklin sm:h-[60px]">
            {blogs[0].title}
          </p>
          <p className="text-lg font-semibold text-[#238C69] font-Libre-Franklin">
            {blogs[0].type}
          </p>
        </div>
      </div>
      {/* Section 3: Blogs  */}
      <div className="flex flex-col py-6 sm:py-12 justify-center divide-y-2 divide-[#238C69] px-5 sm:px-[102px]">
        <div className="flex flex-row sm:flex-row justify-between items-center mb-2 ">
          <p className="text-[22px]/[24px] sm:text-[28px]/[30px] font-medium py-2  font-Playfair-Display">
            Explore Blogs
          </p>{" "}
          <div className="relative">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className={`visible sm:hidden flex z-10 text-[#238C69] relative items-center w-fit rounded-full p-1 mt-1 bg-white  text-base  font-medium font-Libre-Franklin ring-2 ring-[#238C69]`}
            >
              <img
                className={`h-4  transition-transform duration-300 ${
                  open ? "-rotate-90" : "rotate-90"
                }`}
                src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fnext.png?alt=media&token=be40c570-c449-437f-9299-83bb7b6c4b90"
              />
            </button>
            <div
              className={`bg-white w-[173px] z-10 top-10 sm:top-0 right-0 absolute sm:relative p-1 rounded-xl sm:rounded-full flex flex-row sm:w-fit text-[#238C69] boxShadow ${
                open ? " opacity-100  " : "-z-20 opacity-0 sm:opacity-100"
              }`}
            >
              <ul className={`flex  flex-col sm:flex-row w-fit flex-wrap`}>
                {types.map((type, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelection(type)}
                    className={`cursor-pointer text-sm/[14px] sm:text-base/[18px] mx-1 my-1 px-2 py-2  font-medium  ring-2 ring-[#238C69] rounded-full transition-colors ease-in-out duration-500 ${
                      selected === type ? "bg-[#238C69] text-white" : "bg-white"
                    }`}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <ul className="grid grid-cols-1 sm:grid-cols-3 sm:gap-3">
            {blogs.map((Blog, index) => (
              <li
                key={index}
                className={`flex flex-col sm:w-[344px] my-1.5 rounded-3xl boxShadow bg-white`}
              >
                <div className="sm:w-[344px] rounded-t-3xl  hover:border-2 hover:border-[#238C69] hover:rounded-3xl overflow-hidden transition-transform duration-500">
                  <img
                    onClick={() => navigate(`/blogs/${Blog.id}`)}
                    src={Blog.imageUrl}
                    className={` rounded-t-3xl  hover:scale-125 transition-transform duration-300 `}
                  />
                </div>
                <div
                  className={`flex flex-col bg-white px-2 py-2 space-y-3 font-Libre-Franklin h-[166] rounded-b-3xl`}
                >
                  <p className="text-lg/tight sm:text-2xl/tight title-truncate font-medium sm:h-[60px]">
                    {Blog.title}
                  </p>
                  <p className="text-base font-medium text-[#238C69]">
                    {Blog.type}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Show More Button */}
      {moreBlogsLeft && (
        <>
          {lastFetchedBlog && (
            <div className="w-full flex justify-center pb-5">
              <button
                onClick={fetchMoreBlogs}
                className="w-36 font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md  px-2.5  mt-2 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
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
