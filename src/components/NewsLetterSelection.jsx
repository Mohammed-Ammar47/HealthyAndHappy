import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import { db } from "../Firebase";
import MoonLoader from "react-spinners/MoonLoader";
import Spinner from "./Spinner";
import FormSubmitButton from "./FormSubmitButton";

export default function NewsLetterSelection() {
  const [selected, setSelectedNewsletter] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const auth = getAuth();
        const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (docSnap.exists()) {
          setSelectedNewsletter(docSnap.data().subscriptions);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function handleChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedNewsletter((prev) => [...prev, value]);
    } else {
      setSelectedNewsletter((prev) => {
        return [...prev.filter((newsletter) => newsletter !== value)];
      });
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        subscriptions: selected,
      });
      toast.success("Subscribed");
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
    setSubmitLoading(false);
  }
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <MoonLoader color="#238C69" size={160} speedMultiplier={1} />
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="sm:p-2 flex flex-col space-y-2">
            {/* Newsletter 1 */}
            <div
              className={`relative text-base ring-2 ring-emerald-700 p-2 rounded-lg w-full`}
            >
              <div className="flex flex-row justify-between">
                <p className="text-2xl/6">H&H Recipes</p>
                <div className="relative flex flex-wrap items-center">
                  <input
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                    name="recipeNewsletter"
                    type="checkbox"
                    value="H&H Recipes"
                    checked={selected.includes("H&H Recipes")}
                    onChange={handleChange}
                  />
                  <GiCheckMark className="pointer-events-none absolute left-1 top-1 h-5 w-5 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed" />
                </div>
              </div>
              <p>weekly</p>
              <p>
                Keep yourself notified with our latest additions as soon as
                they're released.
              </p>
            </div>
            {/* Newsletter 2 */}
            <div
              className={`text-base ring-2 ring-emerald-700 p-2 rounded-lg w-full`}
            >
              <div className="flex flex-row justify-between">
                <p className="text-2xl/6">H&H Cuisines</p>
                <div className="relative flex flex-wrap items-center">
                  <input
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                    name="cuisineNewsletter"
                    type="checkbox"
                    value="H&H Cuisines"
                    checked={selected.includes("H&H Cuisines")}
                    onChange={handleChange}
                  />
                  <GiCheckMark className="pointer-events-none absolute left-1 top-1 h-5 w-5 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed" />
                </div>
              </div>
              <p>2 weeks</p>
              <p>
                Turn tour inbox into a portal to a new world of cuisines, and
                new experiences for your tongue.
              </p>
            </div>
            {/* Newsletter 3 */}
            <div
              className={`text-base ring-2 ring-emerald-700 p-2 rounded-lg w-full`}
            >
              <div className="flex flex-row justify-between">
                <p className="text-2xl/6">Culinary blogs</p>
                <div className="relative flex flex-wrap items-center">
                  <input
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                    name="recipeNewsletter"
                    type="checkbox"
                    value="Culinary Blogs"
                    checked={selected.includes("Culinary Blogs")}
                    onChange={handleChange}
                  />
                  <GiCheckMark className="pointer-events-none absolute left-1 top-1 h-5 w-5 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed" />
                </div>
              </div>
              <p>2 weeks</p>
              <p>
                Stay updated with our most recent blog posts and articles about
                the culinary world.
              </p>
            </div>
          </div>
          <FormSubmitButton
            customStyle={"h-10 mt-2 w-full"}
            label={"Subscribes"}
            submitLoading={submitLoading}
          />
        </form>
      )}
    </>
  );
}
