import React from "react";
import { useParams } from "react-router-dom";
import FormCadFunc from "../../Components/FormCadFunc/FormCadFunc";
import NavBar from "../../Components/NavBar/NavBar";

const EditFuncionario= () => {
  const {id} = useParams()
  return(
    <div>
      <NavBar />
      <h2 className="m-3">Editar Funcionario</h2>
      <FormCadFunc id={id} />
    </div>
  )
}

export default EditFuncionario;