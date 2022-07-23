import React, {useContext, useState, useEffect} from "react";
import AppContext from "../../Context/AppContext";
import NavBar from "../../Components/NavBar/NavBar";
import _ from "lodash";
import { Chart } from "react-google-charts";

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
    return(
      <div className="d-flex justify-content-center">
        <div>
          <h1>{totalFuncionario}</h1>
          <p>Funcionários Ativos</p>
        </div>
        <div>
          <h1>{funcionariosDesligados}</h1>
          <p>Total de Demissões</p>
        </div>
      </div>
    );
  };

  // const graphEmployees = () =>{
  //   const Admissao = funcionarios.map((func) => {
  //     const ano = new Date(func.dataAdmissao).getFullYear();
  //     const mes = new Date(func.dataAdmissao).toLocaleString('pt-br', {month: "long"});
  //     return [ano, mes, 1 , 0];
  //   });
  //   const Demissao = funcionarios.filter((obj) => obj.dataDesligamento !== '').map((func) => {
  //       const ano = new Date(func.dataDesligamento).getFullYear();
  //       const mes = new Date(func.dataDesligamento).toLocaleString('pt-br', {month: "long"});
  //       return [ano, mes, 0, 1];
  //   });

  //  const v = funcionarios.map((func) => {
  //   const {dataAdmissao, dataDesligamento} = func;
  //   if(dataAdmissao !='' && dataDesligamento)
  //  })

  //   const data = [...Admissao, ...Demissao]
  //   const options = {
  //     isStacked: true,
  //     height: 300,
  //     legend: { position: "top", maxLines: 3 },
  //   }
  //   console.log(funcionarios)
  //   // [ano, mes,admissao,demissao]
  //   return (
  //     <Chart
  //     chartType="AreaChart"
  //     width="100%"
  //     height="400px"
  //     data={[['ano', 'mes', 'Admissão', 'Demissão'], ...data]}
  //     options={options}
  //   />
  //   )
  // };

  return(
    <div >
      <NavBar />
      <h1>Dashboard</h1>
      {statusRender && indicators()}
      <div className="d-flex">
      {statusRender && graphGender()}
      {statusRender && graphSalary()}
      {/* {statusRender && graphEmployees()} */}
      </div>

    </div>
  )
}

export default DashBoard;