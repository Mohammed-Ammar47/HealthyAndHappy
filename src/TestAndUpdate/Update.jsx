import React, { useState } from "react";
import { db } from "../Firebase";
import Spinner from "../components/Spinner";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import { standAloneItem } from "./Steps";
import { Blogss } from "./BlogsFile";
import { toast } from "react-toastify";

export default function Update() {
  const [loading, setLoading] = useState(false);

  async function UpdateR() {
    try {
      const Ref = collection(db, "users");
      const q = query(Ref);
      const querySnapshot = await getDocs(q);
      const recipes = [];
      querySnapshot.forEach((doc) => {
        return recipes.push(doc.data());
      });
      console.log(recipes);
      async function sale() {
        const ratingsItem = [];
        try {
          recipes.forEach((rep) => {
            rep.favourites = [];
          });
          console.log(recipes);
          recipes.forEach((rep) => setDoc(doc(db, "users", rep.id), rep));
        } catch (error) {
          console.log(error);
        }
      }
      sale();
      setLoading(false);
      toast.success("updated");
    } catch (error) {
      console.log(error);
    }
  }

  async function addR() {
    try {
      const Ref = collection(db, "Recipes");
      await RecipesArchive.forEach((rec) => {
        addDoc(Ref, rec);
      });
      async function sale() {
        try {
          const q = query(Ref);
          const querySnapshot = await getDocs(q);
          const recipes = [];
          querySnapshot.forEach((doc) => {
            return recipes.push(doc.id);
          });
          recipes.forEach((id) => {
            updateDoc(doc(db, "Recipes", id), {
              id: id,
              timestamp: serverTimestamp(),
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
      sale();
      setLoading(false);
      toast.success("added");
    } catch (error) {
      console.log(error);
    }
  }

  async function addC() {
    console.log(standAloneItem);
    try {
      const Ref = collection(db, "Cuisines");
      await standAloneItem.forEach((rec) => {
        addDoc(Ref, rec);
      });
      async function sale() {
        try {
          const q = query(Ref);
          const querySnapshot = await getDocs(q);
          const cuisines = [];
          querySnapshot.forEach((doc) => {
            return cuisines.push(doc.id);
          });
          cuisines.forEach((id) => {
            updateDoc(doc(db, "Cuisines", id), {
              id: id,
              timestamp: serverTimestamp(),
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
      sale();
      setLoading(false);
      toast.success("added");
    } catch (error) {
      console.log(error);
    }
  }

  async function addB() {
    console.log(Blogss);
    try {
      const Ref = collection(db, "Blogs");
      await Blogss.forEach((rec) => {
        addDoc(Ref, rec);
      });
      async function sale() {
        try {
          const q = query(Ref);
          const querySnapshot = await getDocs(q);
          const Blogs = [];
          querySnapshot.forEach((doc) => {
            return Blogs.push(doc.id);
          });
          Blogs.forEach((id) => {
            updateDoc(doc(db, "Blogs", id), {
              id: id,
              timestamp: serverTimestamp(),
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
      sale();
      setLoading(false);
      toast.success("added");
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="p-5 space-y-3">
        <button
          className="font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md w-full px-2.5  mt-2 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
          onClick={UpdateR}
        >
          Update
        </button>
        <button
          className="font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md w-full px-2.5  mt-2 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
          onClick={addR}
        >
          Add
        </button>
        <button
          className="font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md w-full px-2.5  mt-2 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
          onClick={addC}
        >
          Add C
        </button>
        <button
          className="font-Libre-Franklin text-base h-10 bg-[#238C69] font-medium text-white rounded-md w-full px-2.5  mt-2 hover:bg-white hover:text-[#238C69] hover:ring-2 hover:ring-[#238C69] active:ring-offset-2"
          onClick={() => addB()}
        >
          Add B
        </button>
      </div>
    </>
  );
}
