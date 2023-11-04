import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import FavouritesProvider from "../contexts/FavouritesContext";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* Section 1  */}
      <div
        className={`bg-[url(https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Ftop-view-table-full-delicious-food-composition.jpg?alt=media&token=094731ef-f7d0-4f6a-bf9a-08e9f8c8d87d)] bg-cover h-screen `}
      >
        <FavouritesProvider>
          <Header />
        </FavouritesProvider>
        <div className="flex flex-col text-center sm:text-start font-Playfair-Display text-white mt-12 sm:mt-24 mx-3 sm:mx-[186px] sm:w-[415px] space-y-4">
          <p className=" text-3xl sm:text-5xl/none font-bold backdrop-blur-[1px] w-">
            Real . Fresh . Meal
          </p>
          <p className="text-2xl sm:text-3xl font-medium backdrop-blur-[1px] sm:w-[360px]">
            Introduce your appetite to Novelty cuisines
          </p>
        </div>
      </div>
      <div className=" bg-[#CFE6D7] pt-8 pb-6 sm:pt-16 sm:pb-12 space-y-12 sm:space-y-24">
        {/* Section 2  */}
        <div className="mx-5 sm:mx-[186px] flex flex-col-reverse sm:flex-row  sm:space-x-[86px]">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fbottom-view-white-round-plate-black-pepper-small-bowl-oil-bottle-coriander-garlic-dill-green-onion-table.jpg?alt=media&token=5f3b2f9f-c807-49d3-b5dc-4b533dcc9c7e"
            className="sm:w-[376px] rounded-xl shadow-[8px_8px_4px_0px_#44614D] "
          />
          <div className="flex flex-col sm:w-[400px] text-center sm:text-start items-center sm:items-start py-4 sm:py-9">
            <div className="flex flex-col  space-y-2">
              <p className="text-[28px] sm:text-[32px] font-bold font-Libre-Franklin">
                Learn New Recipes
              </p>
              <p className="text-xl sm:text-2xl font-medium font-Libre-Franklin ">
                Try new ingredients and blends
              </p>
              <p className="text-base font-normal font-Roboto-Slab">
                Learn new recipes and taste delicious and healthy dishes with
                ingredients from all around world, you can find quick and easy
                recipes or Lengthy and detail for cooking lovers. You will find
                recipes for whatever please your appetite: lunch meals, drinks,
                soups, desserts, sandwiches, salads and more.
              </p>
            </div>
            <button
              className="font-Libre-Franklin text-base h-8 bg-[#238C69] text-white rounded-md w-fit px-2.5 mt-4 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69]"
              onClick={() => {
                navigate("/recipes");
              }}
            >
              Go to recipes
            </button>
          </div>
        </div>
        {/* Section 3  */}
        <div className="mx-5 sm:mx-[186px] flex flex-col sm:flex-row  sm:space-x-[86px]">
          <div className="flex flex-col text-center sm:text-start items-center sm:items-start py-4 sm:py-9">
            <div className="flex flex-col space-y-2">
              <p className="text-[28px] sm:text-[32px] font-bold font-Libre-Franklin">
                Worldwide cuisines
              </p>
              <p className="text-xl sm:text-2xl font-medium font-Libre-Franklin ">
                Acquaint with cuisines from all around the world
              </p>
              <p className="text-base font-normal font-Roboto-Slab">
                Food is the bridge that connects us to faraway places, and every
                bite is a journey, allowing us to traverse continents with our
                taste buds as our compass. Find out and experience cuisines from
                cultures all around the world, taste flavour never thought you'd
                experience.
              </p>
            </div>
            <button
              className="font-Libre-Franklin text-base h-8 bg-[#238C69] text-white rounded-md w-fit px-2.5 mt-4 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69]"
              onClick={() => {
                navigate("/cuisines");
              }}
            >
              Go to cuisines
            </button>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2FCollage%20of%20cultural%20cuisines.png?alt=media&token=85542962-9cbd-4009-9ac4-d11b49f0d0f9"
            className="sm:w-[376px] sm:h-[376px] rounded-xl shadow-[-8px_8px_4px_0px_#44614D] "
          />
        </div>
        {/* Section 4  */}
        <div className="mx-5 sm:mx-[186px] flex flex-col justify-center items-center space-y-2 sm:space-y-4 ">
          <p className="text-[28px] sm:text-[32px] font-bold font-Libre-Franklin text-center">
            Food Blogs
          </p>
          <p className="text-base font-normal font-Roboto-Slab sm:w-[400px] text-center">
            Gain insights with our blogs and articles in various food and
            cooking related topics
          </p>
          <div className="flex flex-col sm:flex-row space-y-2.5 sm:space-x-2.5">
            <div className="bg-white flex flex-col sm:w-[296px] sm:h-[296px] space-y-2 sm:space-y-4 text-center rounded-3xl items-center p-5">
              <p className="text-2xl font-medium font-Roboto-Slab ">
                Cooking Tips
              </p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fstudy.png?alt=media&token=0840760f-8fc4-44a8-b7cf-135e9b8a11c2"
                className="w-24 h-24 "
              />
              <p className="text-base font-normal font-Roboto-Slab  text-center">
                Check some tricks, tips and techniques share by chefs that will
                help you improve your cooking skills.
              </p>
            </div>
            <div className="bg-white flex flex-col sm:w-[296px] sm:h-[296px] space-y-2 sm:space-y-4 text-center rounded-3xl items-center p-5">
              <p className="text-2xl font-medium font-Roboto-Slab ">
                Food and Nutrition
              </p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fvegetable.png?alt=media&token=ea621491-0a84-4a87-b65f-e2864da02c44"
                className="w-24 h-24 "
              />
              <p className="text-base font-normal font-Roboto-Slab  text-center">
                Read and get more information about nutrition and healthy food,
                dietary meals and their benefits
              </p>
            </div>
            <div className="bg-white flex flex-col sm:w-[296px] sm:h-[296px] space-y-2 sm:space-y-4 text-center rounded-3xl items-center p-5">
              <p className="text-2xl font-medium font-Roboto-Slab ">
                Ingredient Spotlights{" "}
              </p>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fspices-2508812.png?alt=media&token=43e6099f-f4f8-464b-b4ca-4d195a4248a8"
                className="w-24 h-24 "
              />
              <p className="text-base font-normal font-Roboto-Slab  text-center">
                Get educate about specific ingredients, their uses, origin, and
                nutritional benefits regarding any type of meal.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/blogs")}
            className="font-Libre-Franklin text-base h-8 bg-[#238C69] text-white rounded-md w-fit px-2.5 mt-4 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69]"
          >
            Read Blogs
          </button>
        </div>
        {/* Section 5  */}
        <div className="mx-5 sm:mx-[186px] flex flex-col justify-center items-center space-y-4 ">
          <p className="text-[28px] sm:text-[32px] font-bold font-Libre-Franklin text-center">
            About Us
          </p>
          <p className="text-base font-normal font-Roboto-Slab sm:w-[400px] text-center">
            Our mission is interduce you to the world of cooking and
            intricacies, allowing you to become a better cook enjoying what our
            world have to offer.
          </p>
          <p className="text-xl font-medium font-Libre-Franklin text-center">
            Our Members
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fman%20(1).png?alt=media&token=53f18010-9e98-4757-92ce-7525c823926d"
              className="w-[138px] h-[138px]"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fman%20(2).png?alt=media&token=bc742ae8-0608-4bf7-a126-f6cbbaa1e44b"
              className="w-[138px] h-[138px]"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/healthy-and-happy-edf1e.appspot.com/o/Assets%2Fman.png?alt=media&token=888c75f3-a27f-4fab-933b-82c0297cdae3"
              className="w-[138px] h-[138px]"
            />
          </div>
          <button
            onClick={() => navigate("/about-us")}
            className="font-Libre-Franklin text-base h-8 bg-[#238C69] text-white rounded-md w-fit px-2.5 mt-4 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69]"
          >
            Read More
          </button>
        </div>
      </div>
      {/* Section 6  */}
      <Footer />
    </>
  );
  s;
}
