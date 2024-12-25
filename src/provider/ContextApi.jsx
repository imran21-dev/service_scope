import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase.config";
import axios from "axios";

export const ThemeContext = createContext(null);
const ContextApi = ({ children }) => {
  const [processing, setProcessing] = useState(true);
  const [user, setUser] = useState(null);

  const [blockScroll, setBlockScroll] = useState(false);

  const registration = (email, password) => {
    setProcessing(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setProcessing(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const GoogleSignIn = () => {
    setProcessing(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setProcessing(true);
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = {email : currentUser.email}
        axios.post('http://localhost:5000/jwt',user, {withCredentials: true})
         .then(() => {
          setProcessing(false);
         })
      }
      else{
        axios.post('http://localhost:5000/logout', {}, {withCredentials: true})
        .then(() => {
          setProcessing(false);
        })
      }
      
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const theme = {
    registration,
    user,
    login,
    GoogleSignIn,
    processing,
    blockScroll,
    setBlockScroll,
    logOut
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const { displayName, photoURL, email } = user;
    const newUser = {
      displayName,
      photoURL,
      email,
    };

    axios.post("http://localhost:5000/add-user", newUser).then(() => {});
  }, [user]);

  console.log(user);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

ContextApi.propTypes = {
  children: PropTypes.element,
};
export default ContextApi;
