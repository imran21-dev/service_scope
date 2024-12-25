import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase.config";
import axios from "axios";

export const ThemeContext = createContext(null)
const ContextApi = ({children}) => {
  const [processing, setProcessing] = useState(true)
  const [user, setUser] = useState(null)

  const [blockScroll, setBlockScroll] = useState(false)

  const registration = (email, password) => {
    setProcessing(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const provider = new GoogleAuthProvider();
  const GoogleSignIn = () => {
    return signInWithPopup(auth, provider)
  }


  useState(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setProcessing(false)
    })
    return () => {
      unsubscribe()
    }
  },[])


   const theme= {
   registration,
   user,
   login,
   GoogleSignIn,
   processing,
   blockScroll, setBlockScroll
   }

   useEffect(()=>{

    if (!user) {
      return
    }

    const {displayName, photoURL, email} = user
    const newUser = {
      displayName,
      photoURL,
      email
    }

    axios.post('http://localhost:5000/add-user', newUser)
    .then(() => {
      
    })

   },[user])

   console.log(user)

    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

ContextApi.propTypes = {
    children : PropTypes.element
}
export default ContextApi;