import React, {useEffect, useContext} from "react";
import NavBar from "../../Components/NavBar/NavBar";
import CadastroFuncionario from "../CadastroFuncionario/CadastroFuncionario";
import AppContext from "../../Context/AppContext";
import './Home.css';

const Home= () => {
  const {getDbFuncionario} = useContext(AppContext)

  useEffect(()=>{
    const updateFunc = async() => {
      await getDbFuncionario()
    }
    updateFunc();
},[]);
  
  return(
    <div>
      <NavBar />

      <ul className="nav nav-tabs">
        <li className="nav-item"><a className="nav-link active" href="#cadastro" data-toggle='tab'>Cadastro</a></li>
        <li className="nav-item"><a className="nav-link disabled " href="#construcao" data-toggle='tab'>Em construção...</a></li>
      </ul>

      <div className="tab-content">
          <div id='cadastro' className="tab-pane active">
              <CadastroFuncionario />
          </div>
          <div id='construcao' className="tab-pane fade">
              <h1>Em Construção...</h1>
          </div>
      </div>
    </div>
  )
}

export default Home;