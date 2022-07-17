import React,{ useContext,useState }  from "react";
import useFirebase from "../../Hooks/useFirebase";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import './ListaFuncionario.css'

const ListaFuncionario= () => {

  const {funcionarios, searchName, setFuncionarios, loginSave} = useContext(AppContext);
  const [statusAviso, setStatusAviso] = useState(false)
  const [id, setId] = useState('');
  const {deleteDocColection} = useFirebase()
  const filter= () => {
    if(searchName !== '') {
      return funcionarios.filter(({nome}) => nome.toUpperCase().includes(searchName.toUpperCase()))
    }
    return funcionarios
  
  }

  const removeFuncionario = async() => {
    await deleteDocColection('funcionarios',loginSave.id, id);
    setFuncionarios(funcionarios.filter((func) => func.id !== id))
    setId('');
    setStatusAviso(false);
  }


  return(
    <>
    <table className="table table-striped table-bordered table-hover table-responsive tb-func">
      <thead className="table-secondary">
        <tr>
          <th>
            Nome
          </th>
          <th>
            Gênero
          </th>
          <th>
            Endereço
          </th>
          <th>
            Data de Nascimento
          </th>
          <th>
            Data de Admissão
          </th>
          <th>
            Data de Desligamento
          </th>
          <th>
            Nível de escolaridade
          </th>
          <th>
            Motivo do desligamento
          </th>
          <th>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {filter().map((func, index) => (
          <tr key={index}>
            <td>
              {func.nome}
            </td>
            <td>
              {func.genero}
            </td>
            <td>
              {func.endereco}
            </td>
            <td>
              {func.dataNascimento}
            </td>
            <td>
              {func.dataAdmissao}
            </td>
            <td>
              {func.dataDesligamento}
            </td>
            <td>
              {func.escolaridade}
            </td>
            <td>
              {func.motivoDesligamento}
            </td>
            <td>
            <Link to={`/editfuncionario/${func.id}`}>
            <i className="fa-solid fa-pen-to-square icon-action"></i>
            </Link>
            <button  onClick={()=>{
              setStatusAviso(true);
              setId(func.id);
              }} className="btn icon-action">
            <i className="fa-solid fa-trash"></i>
            </button>
          </td>
          </tr>
          
        ))}
      </tbody>
    </table>
    {statusAviso && <div className="avisoExcluir">
        <h3>Deseja excluir as informações do funcionário ?</h3>
        <div className="buttons-avisoExcluir">
          <button onClick={()=>{
            setStatusAviso(false);
            setId('');
            }} className="btn close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button className="btn check" onClick={removeFuncionario}>
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
    </div>}
    </>
  )
}

export default ListaFuncionario;