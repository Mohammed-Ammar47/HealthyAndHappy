import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setLoggedInUser(user);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { setLoggedIn, loggedIn, checkingStatus, loggedInUser };
}
