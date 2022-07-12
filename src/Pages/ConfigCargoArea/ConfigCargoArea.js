import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import useFirebase from "../../Hooks/useFirebase";
import NavBar from "../../Components/NavBar/NavBar";
import useCargoFunc from "../../Hooks/useCargoFunc";
import ConfigArea from "../../Components/ConfigArea/ConfigArea";

const ConfigCargoArea = () => {
  const { getDbAreas, nameAreas, areas } = useContext(AppContext);
  const [functions, setFuncions] = useState([]);
  const {addDocColection, deleteDocColection, updateDocColection} = useFirebase();
  const [newArea, setNewArea] = useState('')
  const [filterArea, setFilterArea] = useState('');
  const [newAddFunc, setNewAddFunc] = useState('')
  const {returnIdArea, returnFunc} = useCargoFunc();

  useEffect(()=>{
    getDbAreas();

  }, [])

  const deleteArea = async({target}) => {
     const id =returnIdArea(areas, target.name);
     await deleteDocColection('area', id)
     await getDbAreas();
  }

  const addFunctions = async() => {
    setNewAddFunc('')
    const objArea = returnFunc(areas, filterArea, false)
    objArea[filterArea].push(newAddFunc)
    await updateDocColection('area', objArea.id, {[filterArea]:objArea[filterArea]})
    await getDbAreas();
  }
  const removeFunctions = async(e) => {
    const objArea = returnFunc(areas, filterArea, false)
    const {name} = e.target;
    objArea[filterArea] = objArea[filterArea].filter((func) => func !== name )
    await updateDocColection('area', objArea.id, {[filterArea]:objArea[filterArea]})
    await getDbAreas();
  }

  return(
    <div>
      <NavBar />
      <h1>Configuração</h1>

      <ConfigArea />
      <div>
        <label>
          Área
          <input onChange={({target}) => setNewArea(target.value)} value={newArea} />
          <button onClick={async () => {
            const dt = {[newArea]:[]}
            await addDocColection(dt, 'area')
            await getDbAreas();

          }}>Add</button>
        </label>
        <ul>
          {nameAreas && nameAreas.map((area, index) => (
            <li key={index}>
              <span>{area}</span>
              <button type="button" name={area} onClick={deleteArea}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
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

export default ConfigCargoArea