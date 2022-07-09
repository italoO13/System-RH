import React, { useState } from "react";
import AppContext from "./AppContext";
import useFirebase from "../Hooks/useFirebase";
import useCargoFunc from "../Hooks/useCargoFunc";

const Provider=({ children }) => {
  const [loginSave, setLoginSave] = useState({
    email:'',
    login:false,
  });
  const {readColectionFirebase}= useFirebase()
  const {returnAreas} =  useCargoFunc()
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [areas, setAreas] = useState([]);
  const [nameAreas, setNameAreas] = useState([])

  const getDbFuncionario = async() => {
    const dados = await readColectionFirebase('funcionario')
    setFuncionarios(dados)
  }

  const getDbAreas = async() => {
    const dados = await readColectionFirebase('area');
    setAreas(dados);
    setNameAreas(returnAreas(dados))
  }

  const contextValue = {
    setLoginSave,
    funcionarios,
    loginSave,
    setSearchName,
    searchName,
    getDbFuncionario,
    setFuncionarios,
    getDbAreas,
    nameAreas,
    areas,
  }

  return(
    <AppContext.Provider value={contextValue} >
      {children}
    </AppContext.Provider>
  )
}

export default Provider;