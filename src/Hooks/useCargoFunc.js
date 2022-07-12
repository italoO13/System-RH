const useCargoFunc = () => {

  const returnAreas = (dados) => {
    const areas = dados.map((obj) => Object.keys(obj)[1])
    return areas;
  }

  const returnIdArea = (dados, area) => {
    if(dados.length === 0) {
      return;
    }
    return dados.find((obj) => Object.keys(obj)[1] === area).id
  }

  const returnFunc = (dados, area, onlyFunctions) => {
    if(onlyFunctions) {
      return dados.find((obj) => Object.keys(obj)[1] === area)[area]
    }
    return dados.find((obj) => Object.keys(obj)[1] === area)
  } 



  return { returnAreas, returnIdArea, returnFunc }
}

export default useCargoFunc;