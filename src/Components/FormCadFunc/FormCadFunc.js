import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import useFirebase from "../../Hooks/useFirebase";
import './FormCadFunc.css';

const FormCadFunc = ({id}) => {
  const navigate = useNavigate()
  const {addDocColection, filterIdColection, updateDocColection} = useFirebase();
  const [cadastro, setCadastro] = useState({
    nome:'',
    endereco:'',
    dataNascimento:'',
    dataDesligamento:'',
    dataAdmissao:'',
    genero:'',
    motivoDesligamento:'',
    escolaridade:'',
  });

  const [message, setMessage] = useState('');

  const handleInput = ({target}) => {
    setCadastro({...cadastro, [target.name]:target.value});
  }

  const submitCadatro = async() => {
    try{
      await addDocColection(cadastro, 'funcionario')
      return navigate('/home')
    } catch (e) {
      setMessage(e.message)
    }
  }

  const updateCadastro  = async() => {
    try{
      await updateDocColection('funcionario', id, cadastro)
      return navigate('/home')
    } catch (e) {
      setMessage(e.message)
    }
  }

  useEffect(()=>{
    if(!id) {
      return;
    }
    const getFuncFirebase = async() => {
      const doc = await filterIdColection(id, 'funcionario');
      setCadastro({...cadastro, ...doc})
    }
    getFuncFirebase();
    
  },[])

  return(
    <form className="formCadFunc mt-3">

        <div class="form-floating floatin-form mb-3">
          <input onChange={handleInput} value={cadastro.nome} name="nome" type="text" className="form-control" id="floatingInput" placeholder="nome"/>
          <label htmlFor="floatingInput" className="form-label">Nome</label>
        </div>

        <div class="form-floating mb-3">
          <input onChange={handleInput} value={cadastro.endereco} name="endereco" 
            type="text" class="form-control" id="exampleInputEmail1" placeholder="Endereco" aria-describedby="emailHelp"/>
          <label htmlFor="exampleInputEmail1" class="form-label" >Endereço</label>
        </div>

        <div className="d-flex justify-content-between">
          <div>
              <label htmlFor="exampleInputEmail1" class="form-label">Data de Nascimento</label>
              <input onChange={handleInput} value={cadastro.dataNascimento} name='dataNascimento' type="date" 
              class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>

          <select onChange={handleInput} name="genero" value={cadastro.genero} class="form-select" aria-label="Default select example">
            <option selected>Gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
        </select>

        </div>
        <div className="d-flex justify-content-between">
          <div class="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">Data de Admissão</label>
            <input onChange={handleInput} value={cadastro.dataAdmissao} name="dataAdmissao" type="date" 
            class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>

          <div class="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">Data de Desligamento</label>
            <input onChange={handleInput} value={cadastro.dataDesligamento} name="dataDesligamento" type="date" 
            class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
        </div>

        <select onChange={handleInput} value={cadastro.escolaridade} name="escolaridade" class="form-select mb-3" aria-label="Default select example">
            <option selected>Nível de Escolaridade</option>
            <option value="Sem instrução">Sem instrução</option>
            <option value="Ensino Fundamental incompleto">Ensino Fundamental incompleto</option>
            <option value="Ensino Fundamental completo">Ensino Fundamental completo</option>
            <option value="Ensino Médio incompleto">Ensino Médio incompleto</option>
            <option value="Ensino Médio completo">Ensino Médio completo</option>
            <option value="Ensino Superior incompleto">Ensino Superior incompleto</option>
            <option value="Ensino Superior completo">Ensino Superior completo</option>
        </select>

        <select onChange={handleInput} value={cadastro.motivoDesligamento} name="motivoDesligamento" class="form-select mb-3" aria-label="Default select example">
            <option selected >Motivo do Desligamento</option>
            <option value="Baixo salário">Baixo salário</option>
            <option value="Problemas com a gestão">Problemas com a gestão</option>
            <option value="Baixo desempenho">Baixo desempenho</option>
            <option value="Migração de carreira">Migração de carreira</option>
            <option value="Justa causa">Justa causa</option>
        </select>
        {message && <p className="alert alert-danger">{message}</p>}
        <div className="container-btn-card-save">
          <button type="button" className="btn-cad btn-secondary mx-3" onClick={()=>{
            navigate('/home')
          }}>Fechar</button>
          {id ? <button type="button" onClick={updateCadastro} className="btn-cad save">Editar</button> :
          <button type="button" onClick={submitCadatro} className="btn-cad save">Salvar</button>}
        </div>
    </form>
  )
}

export default FormCadFunc;