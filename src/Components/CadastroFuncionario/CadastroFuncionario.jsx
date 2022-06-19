import React from "react";
import ListaFuncionario from "../ListaFuncionario/ListaFuncionario";
import './CadastroFuncionario.css'

const CadastroFuncionario= () => {
  return(
    <div className="cadastroFuncionario container">
      <h1 className='cadastroFuncionario-titulo'>Cadastro de Funcionário</h1>
      <ListaFuncionario />
    </div>
  )
}

export default CadastroFuncionario;