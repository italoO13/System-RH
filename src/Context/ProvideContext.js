import React, { useState } from "react";
import AppContext from "./AppContext";
import useFirebase from "../Hooks/useFirebase";

const Provider=({ children }) => {
  const [loginSave, setLoginSave] = useState({
    email:'',
    login:false,
  });
  const {readColectionFirebase}= useFirebase()
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchName, setSearchName] = useState('');

  const getDbFuncionario = async() => {
    const dados = await readColectionFirebase('funcionario')
    setFuncionarios(dados)

  }

  const contextValue = {
    setLoginSave,
    funcionarios,
    loginSave,
    setSearchName,
    searchName,
    getDbFuncionario,
    setFuncionarios,
  }

  return(
    <AppContext.Provider value={contextValue} >
      {children}
    </AppContext.Provider>
  )
}

export default Provider;