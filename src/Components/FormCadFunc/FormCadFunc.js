import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import AppContext from "../../Context/AppContext";
import useCargoFunc from "../../Hooks/useCargoFunc";
import useFirebase from "../../Hooks/useFirebase";
import SweetAlert from "react-bootstrap-sweetalert";
import './FormCadFunc.css';

const FormCadFunc = ({id}) => {
  const navigate = useNavigate()
  const [warnSucess, setWarnSucess] = useState(false);
  const {nameAreas, getDbAreas, areas, loginSave} = useContext(AppContext)
  const {returnFunc} = useCargoFunc();
  const {addDocFire, filterIdColection, updateDocColection} = useFirebase();
  const [cadastro, setCadastro] = useState({
    nome:'',
    endereco:'',
    dataNascimento:'',
    dataDesligamento:'',
    dataAdmissao:'',
    genero:'',
    motivoDesligamento:'',
    escolaridade:'',
    area: '',
    funcao: '',
    salario:0,
  });
  const [functions, setFunctions] = useState([]);

  const [message, setMessage] = useState('');

  const handleInput = ({target}) => {
    setCadastro({...cadastro, [target.name]:target.value});
  }

  const registValidation = () => {
    const {nome, endereco, dataNascimento, 
      dataAdmissao, genero, escolaridade, area, funcao, salario} = cadastro;
    if(
      nome === '' || endereco === '' || dataNascimento === '' ||
      dataAdmissao === '' || genero === '' || escolaridade === '' ||
      area === '' || funcao === '' || salario === ''
    ) {
      throw setMessage('Um dos campos : nome, endereco, nascimento, Admissão , genero , escolaridade, area ou função não foi preenchido');
    }

    if(
      genero === 'Gênero' || escolaridade === 'Nível de Escolaridade' ||
      area === 'Selecione a Area' || funcao === 'Selecione a Função' || salario === 0
    ) {
      throw setMessage('Não é possível utilizar os cabeçalhos como uma das opções nos campos de genero, escolaridade, area ou função');
    }
  }


  const submitCadatro = async() => {
    try{
      registValidation();
      await addDocFire(loginSave.id, 'funcionarios' ,cadastro);
      return setWarnSucess(true);
    } catch (e) {
      setMessage(e.message);
    }
  }

  const updateCadastro  = async() => {
    try{
      registValidation();
      await updateDocColection('funcionarios',loginSave.id, id, cadastro);
      return setWarnSucess(true);
    } catch (e) {
      setMessage(e.message)
    }
  }

  useEffect(()=>{
    getDbAreas();
    if(!id) {
      return;
    }
    const getFuncFirebase = async() => {
      const doc = await filterIdColection('funcionarios',loginSave.id, id);
      setCadastro({...cadastro, ...doc})
    }
    getFuncFirebase();
    
  },[])

  useEffect(()=>{
    if(cadastro.area.length ===0) {
      return ;
    }
    const renderFunctions = () => {
      setFunctions(returnFunc(areas, cadastro.area, true))
    }
    renderFunctions();
  }, [cadastro.area])

  useEffect(()=>{
    if(!warnSucess) {
      return 
    }
    setTimeout(() => navigate('/home'), 2000)

  }, [warnSucess])

  return(
    <form className="formCadFunc mt-3">
        <h4>Informações Pessoais</h4>
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

        <h4>Cargo</h4>
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


        <select onChange={handleInput} value={cadastro.motivoDesligamento} name="motivoDesligamento" class="form-select mb-3" aria-label="Default select example">
            <option selected >Motivo do Desligamento</option>
            <option value="Baixo salário">Baixo salário</option>
            <option value="Problemas com a gestão">Problemas com a gestão</option>
            <option value="Baixo desempenho">Baixo desempenho</option>
            <option value="Migração de carreira">Migração de carreira</option>
            <option value="Justa causa">Justa causa</option>
        </select>


        <label>
          Área
          <select onChange={handleInput} value={cadastro.area} name="area" class="form-select mb-3" aria-label="Default select example">
              <option selected>Selecione a Area</option>
              {nameAreas.length > 0 ? (
                nameAreas.map((area, index) => (
                  <option value={area} key={index}>{area}</option>
                ))):
                  <option selected>Cadastre uma Area da sua Empresa</option>
              }
          </select>
        </label>

        <label>
          Função
          <select onChange={handleInput} value={cadastro.funcao} name="funcao" class="form-select mb-3" aria-label="Default select example">
              <option selected>Selecione a Função</option>
              {functions && functions.map((func, index) => (
                <option value={func} key={index}>{func}</option>
              ))}
          </select>
        </label>
        <label>
          Salário Bruto
          <input name="salario" type="number" onChange={handleInput} value={cadastro.salario}></input>
        </label>


        {message && <p className="alert alert-danger">{message}</p>}
        {warnSucess && 
        <SweetAlert success title="Good job!" onConfirm={() => navigate('/home')} onCancel={() => navigate('/home')}>
            Operação feita com sucesso.
        </SweetAlert>
        }


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