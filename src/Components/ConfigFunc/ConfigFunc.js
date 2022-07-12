import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import useFirebase from "../../Hooks/useFirebase";
import useCargoFunc from "../../Hooks/useCargoFunc";

const ConfigFunc = () => {

  const { getDbAreas, nameAreas, areas } = useContext(AppContext);
  const [functions, setFuncions] = useState([]);
  const {updateDocColection} = useFirebase();
  const [filterArea, setFilterArea] = useState('');
  const [newAddFunc, setNewAddFunc] = useState('')
  const {returnFunc} = useCargoFunc();

  useEffect(()=>{
    getDbAreas();

  }, [])

  const addFunctions = async() => {
    setNewAddFunc('')
    const objArea = returnFunc(areas, filterArea, false)
    objArea[filterArea].push(newAddFunc)
    await updateDocColection('area', objArea.id, {[filterArea]:objArea[filterArea]})
    setFuncions(returnFunc(areas, filterArea, true))
  }

  const removeFunctions = async(e) => {
    const objArea = returnFunc(areas, filterArea, false)
    const {name} = e.target;
    objArea[filterArea] = objArea[filterArea].filter((func) => func !== name )
    await updateDocColection('area', objArea.id, {[filterArea]:objArea[filterArea]})
    setFuncions(returnFunc(areas, filterArea, true))
  }

  return (
    <div>
      <h1>Func</h1>

      <div>
          <div>
            {nameAreas && nameAreas.map((area, index) => (
              <button type="button" name={area} key={index} onClick={({target})=>{
                setFilterArea(target.name);
                setFuncions(returnFunc(areas, target.name, true))
              }} >{area}</button>
            ))}
          </div>
          <div>
            <label>
              Funções
              <input type="text" value={newAddFunc} onChange={({target})=> setNewAddFunc(target.value)} />
              <button type="button" onClick={addFunctions}>Add</button>
            </label>

            <ul>
              {console.log(functions)}
              {functions && functions.map((func,index) => (
                <li key={index}>
                  <span>{func}</span>
                  <button type="button" name={func} onClick={removeFunctions}>Remove</button>
                </li>
              ))}
            </ul>
              
            
          </div>

      </div>
    </div>
  )

}

export default ConfigFunc;