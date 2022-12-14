import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import ResetPassword from './Pages/RedefinirConta/ResetPassoword';
import Home from './Pages/Home/Home';
import NovoFuncionario from './Pages/NovoFuncionario/NovoFuncionario';
import CreateCount from './Pages/CreateCount/CreateCount';
import DashBoard from './Pages/DashBoard/Dashboard';
import EditFuncionario from './Pages/EditFuncionario/EditFuncionario';
import ConfigCargoArea from './Pages/ConfigCargoArea/ConfigCargoArea';
import Logout from './Pages/Logout/Logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/DashBoard' element={<DashBoard/>} />
          <Route path='editfuncionario/:id' element={<EditFuncionario />}/>
          <Route path='/createcount' element={<CreateCount/>}/>
          <Route path='/novofuncionario' element={<NovoFuncionario/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/config/:step' element={<ConfigCargoArea/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
