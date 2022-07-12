import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import ConfigArea from "../../Components/ConfigArea/ConfigArea";
import ConfigFunc from "../../Components/ConfigFunc/ConfigFunc";

const ConfigCargoArea = () => {

  return(
    <div>
      <NavBar />
      <h1>Configuração</h1>

      <ConfigArea />

      <ConfigFunc />

    </div>

  )
}

export default ConfigCargoArea