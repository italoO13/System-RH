import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

const useFirebase = () => {
  const readColectionFirebase = async(inputColection) => {
    let bdFuncTotal = []
    const querySnapshot = await getDocs(collection(db, inputColection));
    querySnapshot.forEach((doc)=> {
      let dados = doc.data()
      // setFuncionarios([...funcionarios, {id:doc.id, ...dados}])
      bdFuncTotal.push({id:doc.id, ...dados})
    })
    return bdFuncTotal;
  }
  const filterIdColection = async(id, inputColection) => {
    let func = {};
    const querySnapshot = await getDocs(collection(db, inputColection));
    querySnapshot.forEach((doc) => {
      let dados = doc.data();
      if(`${doc.id}` === id) {
        func = {id:doc.id, ...dados};
      }
    })
    return func;
  }

  const addDocColection = async(datecad, inputColection) => {
    await addDoc(collection(db, inputColection), {...datecad});
  }

  const updateDocColection = async(inputColection, id, cadastro ) => {
    const ref = doc(db,inputColection, id);
    await updateDoc(ref, {
        ...cadastro
    })
  }

  const deleteDocColection = async(inputColection, id) => {
    await deleteDoc(doc(db, inputColection, id));
  }

  return {readColectionFirebase, filterIdColection, 
    addDocColection, updateDocColection, deleteDocColection }
}

export default useFirebase;