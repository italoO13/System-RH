import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import useFirebase from "../../Hooks/useFirebase";
import useCargoFunc from "../../Hooks/useCargoFunc";
import imgFilter from '../../image/filterFunc.png';
import './ConfigFunc.css';

const ConfigFunc = () => {

  const { getDbAreas, nameAreas, areas, loginSave } = useContext(AppContext);
  const [functions, setFuncions] = useState([]);
  const [message, setMessage] = useState('');
  const {updateDocColection} = useFirebase();
  const [filterArea, setFilterArea] = useState('');
  const [newAddFunc, setNewAddFunc] = useState('')
  const {returnFunc} = useCargoFunc();

  useEffect(()=>{
    getDbAreas();

  }, [])

  const validateFunc = () => {
    return functions.map((func) => {
      if(func.toLowerCase() === newAddFunc.toLocaleLowerCase()) {
        throw setMessage('Não é possível cadastrar a mesma Função da empresa')
      }
      return false;
    } )
  }

  const addFunctions = async() => {
    try {
      setNewAddFunc('');
      setMessage('');
      validateFunc();
      const objArea = returnFunc(areas, filterArea, false)
      objArea[filterArea].push(newAddFunc)
      await updateDocColection('area',loginSave.id, objArea.id, {[filterArea]:objArea[filterArea]})
      setFuncions(returnFunc(areas, filterArea, true))
    } catch (e) {
      setMessage(e.message)
    }
  }

  const removeFunctions = async(e) => {
    const objArea = returnFunc(areas, filterArea, false)
    const {name} = e.target;
    objArea[filterArea] = objArea[filterArea].filter((func) => func !== name )
    await updateDocColection('area', loginSave.id, objArea.id, {[filterArea]:objArea[filterArea]})
    setFuncions(returnFunc(areas, filterArea, true))
  }

  return (
    <div>
      <h1>Funções</h1>

      <div>
          <div className="m-3">
            {nameAreas && nameAreas.map((area, index) => (
  
              <button 
                type="button" 
                name={area}
                className={`btn m-1 ${area === filterArea ? 'btn-primary': 'btn-dark'}`}
                key={index} 
                onClick={({target})=>{
                setFilterArea(target.name);
                setFuncions(returnFunc(areas, target.name, true))
              }}>
                {area}
              </button>
            ))}
          </div>
          <div>
  
            <label className="config_func_wrapper_add">
              <input 
               type="text"
               value={newAddFunc}
               placeholder="Adicione uma nova Função" 
               onChange={({target})=> setNewAddFunc(target.value)} />
              <button type="button" onClick={addFunctions}>
                <i class="fa-solid fa-plus"></i>
              </button>
            </label>

            {message && <p className="alert alert-danger">{message}</p>}
            {!filterArea &&
            <>
              <img 
                src={imgFilter} 
                className='configFuncImgFilter' 
                alt="Imagem pedido para selecionar filtro" 
              />
              <h4>Selecione qual área deseja visualizar as funções</h4>
            </>

            }

            <ul className="config_func_wrapper_list mt-3">
              {functions && functions.map((func,index) => (
                <li key={index}>
                  <span>{func}</span>
                  <button type="button" name={func} onClick={removeFunctions}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
              
            
          </div>

      </div>
    </div>
  )

}

export default ConfigFunc;