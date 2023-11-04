import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AboutUs from "./pages/AboutUs";
import RecipePage from "./pages/RecipePage";
import ContactUs from "./pages/ContactUs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
// import Update from "./Update";
import FavouritesProvider from "./contexts/FavouritesContext";
import Cuisines from "./pages/Cuisines";
import CuisinesPage from "./pages/CuisinesPage";
import Blogs from "./pages/Blogs";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/cuisines" element={<Cuisines />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route
            path="/recipes/:recipeId"
            element={
              <FavouritesProvider>
                <RecipePage />
              </FavouritesProvider>
            }
          />
          <Route
            path="/cuisines/:cuisineId"
            element={
              <FavouritesProvider>
                <CuisinesPage />
              </FavouritesProvider>
            }
          />
          <Route
            path="/blogs/:blogId"
            element={
              <FavouritesProvider>
                <BlogPage />
              </FavouritesProvider>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/update" element={<Update />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default App;
