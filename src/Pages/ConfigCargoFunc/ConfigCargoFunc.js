import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import useFirebase from "../../Hooks/useFirebase";
import NavBar from "../../Components/NavBar/NavBar";
import useCargoFunc from "../../Hooks/useCargoFunc";

const ConfigCargoFunc = () => {
  const { getDbAreas, nameAreas, areas } = useContext(AppContext)
  
  const {addDocColection, deleteDocColection} = useFirebase()
  const [newArea, setNewArea] = useState('')
  const {returnIdArea} = useCargoFunc();

  useEffect(()=>{
    getDbAreas();

  }, [])

  const deleteArea = async({target}) => {
     const id =returnIdArea(areas, target.name);
     await deleteDocColection('area', id)
     await getDbAreas();
  }

  return(
    <div>
      <NavBar />
      <h1>Configuração</h1>

      <div>
        <label>
          Área
          <input onChange={({target}) => setNewArea(target.value)} value={newArea} />
          <button onClick={async () => {
            const dt = {[newArea]:{}}
            addDocColection(dt, 'area')
            getDbAreas();

          }}>Add</button>
        </label>
        <ul>
          {nameAreas && nameAreas.map((area, index) => (
            <li key={index}>
              <span>{area}</span>
              <button name={area} onClick={deleteArea}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
          

      </div>

    </div>

  )
}

export default ConfigCargoFunc