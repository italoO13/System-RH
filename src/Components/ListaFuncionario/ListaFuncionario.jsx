import React,{ useState,  useContext }  from "react";
import { useEffect } from "react";
import AppContext from "../../Context/AppContext";

const ListaFuncionario= () => {

  const {funcionarios} = useContext(AppContext);


  return(
    <table className="table table-striped table-bordered table-hover table-responsive">
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
        <tr>
          <td>
            Italo Iveldo Luiz
          </td>
          <td>
            Masculino
          </td>
          <td>
            Rua Antonio Carneiro Cezar de menezes, Carpina - PE
          </td>
          <td>
            16/03/1997
          </td>
          <td>
            20/06/2009
          </td>
          <td>
            -
          </td>
          <td>
            Ensino Superior Completo
          </td>
          <td>
            -
          </td>
          <td>
            edit/remove
          </td>
        </tr>
        {funcionarios.map((func) => (
          <tr>
            <td>
              {func.nome}
            </td>
            <td>
              {func.Gênero}
            </td>
            <td>
              {func.Endereço}
            </td>
            <td>
              {func['Data de Nascimento']}
            </td>
            <td>
              {func.nome}
            </td>
            <td>
              {func.nome}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListaFuncionario;