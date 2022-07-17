import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import useFirebase from "../../Hooks/useFirebase";
import useCargoFunc from "../../Hooks/useCargoFunc";

const ConfigArea = () =>{

  const { getDbAreas, nameAreas, areas, loginSave } = useContext(AppContext);
  const {addDocFire, deleteDocColection } = useFirebase();
  const [newArea, setNewArea] = useState('');
  const [message, setMessage] = useState('');
  const {returnIdArea } = useCargoFunc();

  useEffect(()=>{
    getDbAreas();
  }, [])

  const validateArea = () => {
    return nameAreas.map((area) => {
      if(area.toLowerCase() === newArea.toLocaleLowerCase()) {
        throw setMessage('Não é possível cadastrar a mesma Área da empresa')
      }
      return false;
    } )
  }

  const deleteArea = async({target}) => {
     const id =returnIdArea(areas, target.name);
     await deleteDocColection('area',loginSave.id, id)
     await getDbAreas();
  }

  return(
    <div>
      <h1>Area</h1>
      <div>
        <label>
          Área
          <input onChange={({target}) => setNewArea(target.value)} value={newArea} />
          <button onClick={async () => {
            try {
              setNewArea('');
              setMessage('')
              validateArea();
              const dt = {[newArea]:[]}
              await addDocFire(loginSave.id, 'area', dt)
              await getDbAreas();

            } catch (e) {
              setMessage(e.message)
            }

          }}>Add</button>
        </label>
        {message && <p className="alert alert-danger">{message}</p>}
        <ul>
          {nameAreas && nameAreas.map((area, index) => (
            <li key={index}>
              <span>{area}</span>
              <button type="button" name={area} onClick={deleteArea}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>

  )

}


export default ConfigArea;