import PropTypes from "prop-types";
import { createContext, useState } from "react";

import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

export const ThemeContext = createContext(null)
const ContextApi = ({children}) => {
  const [processing, setProcessing] = useState(true)
  const [user, setUser] = useState(null)

  const registration = (email, password) => {
    setProcessing(true)
    return createUserWithEmailAndPassword(auth, email, password)
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
   user
   }
   console.log(user)

    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

ContextApi.propTypes = {
    children : PropTypes.element
}
export default ContextApi;