import React, { useState } from "react";
import AppContext from "./AppContext";
import { readLoginStorage } from "../LocalStorage/localstorage";

const Provider=({ children }) => {
  const [loginSave, setLoginSave] = useState({
    email:'',
    login:false,
  });

  const retentionLogin =() => {
    const status = readLoginStorage();
      if(status!== false) {
        setLoginSave({...loginSave, login:true})
      }
        setLoginSave({...loginSave, status, login:false})
    }
  
  const Login = () => {

  }
  
  const contextValue = {
    retentionLogin: retentionLogin
  }

  return(
    <AppContext.Provider value={contextValue} >
      {children}
    </AppContext.Provider>
  )
}

export default Provider;