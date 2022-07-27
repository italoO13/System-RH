import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import ConfigArea from "../../Components/ConfigArea/ConfigArea";
import ConfigFunc from "../../Components/ConfigFunc/ConfigFunc";
import './ConfigCargoArea.css';
import { Link, useParams } from "react-router-dom";

const ConfigCargoArea = () => {
  const {step} = useParams();

  return(
    <div className="ConfigCargoArea">
      <NavBar />
      <div className="ConfigCargoArea_wrapper">
        <div className="ConfigCargoArea_wrapper_nav">
          <h1>Configuração</h1>
          <ul>
            <li className={step === 'area' && `ConfigCargoArea_active`}>
              <i className="icon fa-solid fa-building"></i>
              <Link to={'/config/area'}>Área</Link>
              </li>
            <li className={step === 'funcao' && `ConfigCargoArea_active`}>
              <i className="icon fa-solid fa-user"></i>
              <Link to={'/config/funcao'}>Função</Link>
            </li>
          </ul>
        </div>
        <div className="ConfigCargoArea_wrapper_content">
          {step === 'area' ? 
            <ConfigArea /> :
            <ConfigFunc />
            }

        </div>
      </div>

    </div>

  )
}

export default ConfigCargoArea