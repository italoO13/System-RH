import React, {useContext, useState, useEffect} from "react";
import AppContext from "../../Context/AppContext";
import NavBar from "../../Components/NavBar/NavBar";
import _ from "lodash";
import { Chart } from "react-google-charts";
import './Dashboard.css';

const DashBoard= () => {
  const {funcionarios} = useContext(AppContext);
  const [statusRender, setStatusRender] = useState(false);

  useEffect(()=>{
    const changeRender = () => {
      if(funcionarios !== {}){
        setStatusRender(true);
      }
    }
    changeRender();
  },[funcionarios]);

  const graphGender = () => {

    if(funcionarios.length ===0) {
      return (
      <div className="dash_tratamento_ftdados">
        <p>Sem dados Suficiente</p>
      </div>)
    }

    const values = _.groupBy(funcionarios, (func) => {
      return func.genero;
    })
    const data = Object.keys(values).map((key) => [key, values[key].length])
    const options = {
      title:'Funcionários por Sexo',
    };

    return (
      <Chart
      chartType="PieChart"
      data={[['', ''], ...data]}
      options={options}
      width={"100%"}
      height={"400px"}
    />
    )
  };

  const graphSalary = () => {

    if(funcionarios.length ===0) {
      return (
      <div className="dash_tratamento_ftdados">
        <p>Sem dados Suficiente</p>
      </div>)
    }

    const values = _.groupBy(funcionarios, (func) => {
      return func.area
    })

    const data = _.map(values, (obj, key) => {
      return [
        key, 
        _.sumBy(values[key], area => {
          if(area.dataDesligamento !== '') {
            return 0
          }
          return parseFloat(area.salario)
        })
      ]
    });

    const options = {
      title: 'Total de salário por setor',
      chartArea: { width:'50%'},
    }

    return (
      <Chart 
        chartType ="BarChart"
        width="100%"
        height ="400px"
        data={[['Area', 'Salary'], ...data]}
        options={options}
      />
    )
  };

  const indicators =() =>{
    const totalFuncionario = funcionarios
      .filter((func) => func.dataDesligamento === '').length;
    const funcionariosDesligados = funcionarios
      .filter((func) => func.dataDesligamento !== '').length;
    const turnover = (totalFuncionario/funcionariosDesligados) *100;
    return(
      <div className="dash_indicadores d-flex justify-content-around">
        <div className="dash_indicadores_cards">
          <h1>{totalFuncionario}</h1>
          <p>Funcionários Ativos</p>
        </div>
        <div className="dash_indicadores_cards">
          <h1>{funcionariosDesligados}</h1>
          <p>Total de Demissões</p>
        </div>
        <div className="dash_indicadores_cards">
          <h1>{turnover} %</h1>
          <p>Turnover Geral</p>
        </div>
      </div>
    );
  };

  const graphEmployees = () =>{

    if(funcionarios.length ===0) {
      return (
      <div className="dash_tratamento_ftdados">
        <p>Sem dados Suficiente</p>
      </div>)
    }
    

   const v = funcionarios.reduce((accTotal,func) => {

    const {dataAdmissao, dataDesligamento} = func;
    const acumuladoAd = accTotal.reduce((acc, arr) => acc + arr[1], 0) || 0
    console.log(acumuladoAd)
    const acumuladoDe = accTotal.reduce((acc, arr) => acc + arr[2], 0) || 0
    if(dataAdmissao !=='') {
      return [...accTotal, [new Date(dataAdmissao), acumuladoAd + 1, acumuladoDe]]
    }
    if(dataDesligamento !== '') {
      return [...accTotal, [new Date(dataDesligamento), acumuladoAd, acumuladoDe + 1]]
    }
    return accTotal;
  
   }, [])

    console.log(v)
  };

  const graphReasonDimissal = () => {

    if(funcionarios.length ===0) {
      return (
      <div className="dash_tratamento_ftdados">
        <p>Sem dados Suficiente</p>
      </div>)
    }

    const funcDemitidos = funcionarios
      .filter((func) => func.dataDesligamento !== '' && func.motivoDesligamento !== '');
    const values = _.groupBy(funcDemitidos, (func) => {
      return func.motivoDesligamento;
    });

    const data = _.map(values, (func, key) => {
      return [
        key,
        values[key].length]
    })
    const options = {
      title: 'Motivos de desligamentos',
      chartArea: { width:'50%'},
    }

    return (
      <Chart 
        chartType ="BarChart"
        width="100%"
        height ="400px"
        data={[['Motivo Demissão', 'Qnt'], ...data]}
        options={options}
      />
    )
  }


  return(
    <div className="dashboard ">
      <NavBar />
      {statusRender && indicators()}
      <div className="d-flex">
      {statusRender && graphGender()}
      {statusRender && graphSalary()}
      {statusRender && graphEmployees()}
      </div>
      {statusRender && graphReasonDimissal()}

    </div>
  )
}

export default DashBoard;