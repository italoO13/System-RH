import React from "react";
import FormCadFunc from "../../Components/FormCadFunc/FormCadFunc";
import NavBar from "../../Components/NavBar/NavBar";

const NovoFuncionario= () => {
  return(
    <div>
      <NavBar />
      <h2 className="m-3">Novo Funcionario</h2>
      <FormCadFunc />
    </div>
  )
}

export default NovoFuncionario;