import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import ListaFuncionario from "../../Components/ListaFuncionario/ListaFuncionario";
import './CadastroFuncionario.css';

const CadastroFuncionario= () => {
  const navigate = useNavigate()
  const {setSearchName} = useContext(AppContext);
  return(
    <div className="cadastroFuncionario container">
      <h1 className='cadastroFuncionario-titulo'>Cadastro de Funcionário</h1>
      <div className="row mb-3">
        <div className="col-4">
          <button type="button" className="w-100 btn btn-primary" onClick={()=> {
            navigate('/novofuncionario')
          }} >
          <i className="px-1 fa-solid fa-plus"></i>
            Cadastrar</button>
        </div>
        <div className="col-8"> 
          <div className="input-group">
              <input onChange={({target})=> setSearchName(target.value)} type='text' className="form-control" placeholder="Nome do Funcionário" aria-label="filterName" aria-describedby="basic-addon2"/>
              <span class="btn btn-primary" id="basic-addon2">
              <i className="px-1 fa-solid fa-magnifying-glass"></i>
                Pesquisar</span>
          </div>
        </div>
      </div>


      {/* <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <span class="input-group-text" id="basic-addon2">@example.com</span>
</div> */}

      <div className="row">
          <ListaFuncionario />
      </div>

    </div>
  )
}

export default CadastroFuncionario;