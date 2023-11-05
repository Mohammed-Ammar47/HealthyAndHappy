import React, { useEffect, useState } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { useFavourite } from "../contexts/FavouritesContext";
import { db } from "../Firebase";
import Header from "../components/Header";
import AddToFavourites from "../components/bookmarkComponents/AddToFavourites";
import CommentProvider from "../contexts/CommentContext";
import CommentSection from "../components/commentComponents/ReviewSection";
import Footer from "../components/Footer";
import SectionContent from "../components/BlogContent/SectionContent";
import DOMPurify from "dompurify";

export default function BlogPage() {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const { loggedIn, loggedInUser, checkingStatus } = useAuthStatus();
  const { setBookmarked, user, loadingUser } = useFavourite();
  const param = useParams();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const docRef = doc(db, "Blogs", param.blogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data());
          setLoading(false);
          {
            user !== null &&
              user.favourites.some((fav) => fav.id === docSnap.data().id) &&
              setBookmarked(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    {
      !loadingUser && !checkingStatus && fetchBlog();
    }
  }, [param.blogId, checkingStatus, loadingUser, user]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="bg-[#e9ffea76] ">
      {/* Header  */}
      <Header />
      <div className=" divide-y-2 divide-[#238C69] px-5 sm:px-60">
        {/* Section 1  */}
        <div className="flex flex-col  justify-start py-6 mt-6">
          <p className="flex text-2xl/7 sm:text-[32px]/[32px] font-bold font-Playfair-Display text-start ">
            {blog.title}
          </p>
          <div className="flex flex-row justify-start py-6 ">
            <div className="bg-white px-1 rounded-full flex items-center h-9 w-fit text-[#238C69] boxShadow">
              <p className="text-lg/tight p-1 font-Libre-Franklin font-semibold">
                {blog.type}
              </p>
            </div>
            <AddToFavourites imageUrl={blog.imageUrl} id={param.blogId} />
          </div>
          <img
            src={blog.imageUrl}
            className=" object-cover rounded-2xl my-3 shadow-[0px_3px_4px_2px_#44614D]"
          />
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.overview),
            }}
            className="text-base sm:text-lg text-[#104030] font-Roboto font-normal p-1"
          ></p>{" "}
        </div>
        {/* Section 4: the method  */}
        <div className="flex flex-col justify-start  space-y-5 py-6 ">
          <ul className="space-y-10 ">
            {blog.sections.map((section, index) => (
              <li
                key={index}
                className="flex flex-col justify-center space-y-3"
              >
                <div className="text-lg sm:text-2xl font-medium font-Libre-Franklin flex flex-row space-x-3">
                  <p className="text-[#238C69]">{index + 1}. </p>
                  <p>{section.sectionTitle}</p>
                </div>
                {section.image !== "" && (
                  <div className="rounded-lg">
                    <div className="p-0 sm:p-5">
                      <img
                        src={section.image}
                        className=" object-cover  rounded-[2rem] shadow-[0px_3px_4px_2px_#44614D]"
                      />
                    </div>
                  </div>
                )}
                <div className=" text-start p-1">
                  <SectionContent content={section.sectionContent} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Section 5: the result  */}
        <div className="flex flex-col justify-start  space-y-5 py-6 mb-6">
          <p className=" text-2xl/7 sm:text-[32px]/[32px] font-bold font-Playfair-Display text-start ">
            {blog.conclusion.title}
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.conclusion.content),
            }}
            className="text-base sm:text-lg text-[#104030] font-Roboto font-normal p-1"
          ></p>
        </div>
      </div>
      {/* Section 6: Reviews */}
      <div className="bg-white px-5 sm:px-[146px] divide-y-2 divide-[#238C69]">
        <p className="text-2xl sm:text-[32px] font-Libre-Franklin font-semibold">
          Comment Section
        </p>
        {!loggedIn && (
          <div className="flex flex-row space-x-1 items-center py-5">
            <p className="text-xl sm:text-2xl font-Libre-Franklin font-medium">
              Log in and leave a Review{" "}
            </p>
            <HiLogin
              className="text-xl sm:text-2xl text-[#238c69bc] hover:text-[#238C69]"
              onClick={() => navigate("/newsletter")}
            />
          </div>
        )}
        <div>
          <CommentProvider contentPage={"Blogs"} paramId={param.blogId}>
            <CommentSection />
          </CommentProvider>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
