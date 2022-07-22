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
  },[funcionarios])

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
  }

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
  }

  const indicators =() =>{
    console.log(funcionarios);
    const totalFuncionario = funcionarios
      .filter((func) => func.dataDesligamento === '').length;
    const funcionariosDesligados = funcionarios
      .filter((func) => func.dataDesligamento !== '').length;
    
  }

  return(
    <div>
      <NavBar />
      <h1>Dashboard</h1>
      <div className="d-flex">
      {statusRender && graphGender()};
      {statusRender && graphSalary()}
      </div>
      {statusRender && indicators()}

    </div>
  )
}

export default DashBoard;