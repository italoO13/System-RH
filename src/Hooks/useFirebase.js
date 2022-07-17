import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

const useFirebase = () => {

  
  const createRef = (id, subCollect) => {
    const ref =  doc(db, 'usuarios', id)
    return collection(ref, subCollect);
  }

  const addSubCollection = async(id) => {
    const colRefArea = createRef(id, 'area');
    const colRefFunc = createRef(id, 'funcionarios');
    await addDoc(colRefArea, {
    });
    await addDoc(colRefFunc, {
    });
  }
  const addDocFire = async(id, subCollect, data) =>{
    const colRefAdd = createRef(id, subCollect);
    await addDoc(colRefAdd, data )
  }

  const readColectionFirebase = async(id, subCollect) => {
    const colRefRead = createRef(id, subCollect);
    let bdFuncTotal = []
    const querySnapshot = await getDocs(colRefRead);
    querySnapshot.forEach((doc)=> {
      let dados = doc.data()
      // setFuncionarios([...funcionarios, {id:doc.id, ...dados}])
      bdFuncTotal.push({id:doc.id, ...dados})
    })
    return bdFuncTotal;
  }

  const updateDocColection = async(subCollect, idLogin, idDoc, data ) => {
    const colRefUpdate = createRef(idLogin, subCollect);
    const refRegist = doc(colRefUpdate, idDoc);
    await updateDoc(refRegist, {
        ...data
    })
  }

  const filterIdColection = async(subCollect, idLogin, idDoc) => {
    const colRefId =  createRef(idLogin, subCollect)
    let func = {};
    const querySnapshot = await getDocs(colRefId);
    querySnapshot.forEach((doc) => {
      let dados = doc.data();
      if(`${doc.id}` === idDoc) {
        func = {id:doc.id, ...dados};
      }
    })
    return func;
  }

  const addDocColection = async(datecad, inputColection) => {
    await addDoc(collection(db, inputColection), {...datecad});
  }

  const deleteDocColection = async(subCollect, idLogin, idDoc) => {
    const colRefDel = createRef(idLogin, subCollect);
    await deleteDoc(doc(colRefDel, idDoc));
  }

  return {readColectionFirebase, filterIdColection, 
    addDocColection, updateDocColection, deleteDocColection, addSubCollection, addDocFire }
}

export default useFirebase;