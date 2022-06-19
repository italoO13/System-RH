import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { readLoginStorage } from "../LocalStorage/localstorage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";

const Provider=({ children }) => {
  const [loginSave, setLoginSave] = useState({
    email:'',
    login:false,
  });
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(()=>{
    const getDbFuncionario = async() => {
      const querySnapshot = await getDocs(collection(db, 'funcionario'));
      querySnapshot.forEach((doc)=> {
        const dados = doc.data()
        setFuncionarios([...funcionarios, {id:doc.id, ...dados}])
      })

    }
    if(loginSave.login) {
      console.log('entrou pelo menos')
      getDbFuncionario();
    }

  },[loginSave])

  // const retentionLogin =() => {
  //   const status = readLoginStorage();
  //     if(status!== false) {
  //       setLoginSave({...loginSave, login:true})
  //     }
  //       setLoginSave({...loginSave, status, login:false})
  //   }
  
  // const Login = () => {

  // }
  
  const contextValue = {
    setLoginSave,
    funcionarios,
    loginSave,
  }

  return(
    <AppContext.Provider value={contextValue} >
      {children}
    </AppContext.Provider>
  )
}

export default Provider;