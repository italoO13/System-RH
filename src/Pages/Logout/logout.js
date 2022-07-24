import React, {useEffect, useContext} from "react";
import NavBar from "../../Components/NavBar/NavBar";
import AppContext from "../../Context/AppContext";
import goodBye from '../../image/goodBye.png'

const Logout = () => {
  const {setLoginSave} = useContext(AppContext)

  useEffect(()=>{
    const returnPageLogin = () => {
      setTimeout(()=> setLoginSave({...setLoginSave, 'success':''}), 3000)
    }

    returnPageLogin();
  }, [])

  return (
    <div>
      <NavBar />
      <h1>Obrigado por utilizar nosso sistema !</h1>
      <img src={goodBye} alt="imagem de pessoa dando tchau" />
    </div>
  )

}


export default Logout;