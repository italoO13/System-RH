import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import useFirebase from "../../Hooks/useFirebase";
import useCargoFunc from "../../Hooks/useCargoFunc";

const ConfigArea = () =>{

  const { getDbAreas, nameAreas, areas, loginSave, setLoginSave } = useContext(AppContext);
  const {addDocFire, deleteDocColection } = useFirebase();
  const [newArea, setNewArea] = useState('')
  const {returnIdArea } = useCargoFunc();

  useEffect(()=>{
    getDbAreas();
    // setLoginSave({email:'italoiveldoluiz@gmail.com', id:'JEAklp1ZbvUgHbmiO5k0N5fpLHb2', success:true})
  }, [])

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
            const dt = {[newArea]:[]}
            await addDocFire(loginSave.id, 'area', dt)
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
    </div>

  )

}


export default ConfigArea;