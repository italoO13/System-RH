import React, {useEffect, useContext} from "react";
import NavBar from "../../Components/NavBar/NavBar";
import AppContext from "../../Context/AppContext";
import goodBye from '../../image/goodBye.png'
import './Logout.css';

const Logout = () => {
  const {setLoginSave} = useContext(AppContext)

  useEffect(()=>{
    const returnPageLogin = () => {
      setTimeout(()=> setLoginSave({...setLoginSave, 'success':''}), 3000)
    }

    returnPageLogin();
  }, [])

  return (
    <div className="page_logout">
      <NavBar />
      <h1>Obrigado por utilizar nosso sistema !</h1>
      <img src={goodBye} alt="imagem de pessoa dando tchau" />
    </div>
  )

}


export default Logout;