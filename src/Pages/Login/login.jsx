import React, {useState, useContext} from "react";
import { Link, Navigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import './Login.css'

const Login = () =>{ 
  const [email, setEmail] = useState();
  const [password, setPassword]= useState();
  const [sucess, setSucess] = useState();
  const {setLoginSave} = useContext(AppContext)

  const LoginUser = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email,password);
      setSucess(true);
      setLoginSave({email, login:true})
    } catch (e) {
      setSucess(false);
    }
  }

  return(
<div className="Login container d-flex justify-content-center pt-5">
  <form >
    <img className="mb-4" src="https://uploads-ssl.webflow.com/6250999dc9bea957c03e3e1f/6250999dc9bea955563e3e31_terceirizacao-de-rh.png" alt="login RH" width="150px"/>
    <h1 className="h3 mb-3 fw-normal">Login</h1>

    <div className="form-floating ">
      <input type="email" className="form-control" id="floatingInput" onChange={({target})=> setEmail(target.value)} placeholder="name@example.com"/>
      <label htmlFor="floatingInput">Email</label>
    </div>
    <div className="form-floating mb-2">
      <input type="password" className="form-control" onChange={({target}) => setPassword(target.value)} id="floatingPassword" placeholder="Password"/>
      <label htmlFor="floatingPassword">Password</label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={LoginUser}>Entrar</button>
    {sucess === false && <div className="alert alert-danger mt-2" role='alert'>
      Email ou senha inválidos !
    </div>}
    {sucess &&
      <Navigate to="/home"/>
    }
    <div className="d-flex mt-4 justify-content-between">
      <Link className="d-block mt-2 text-decoration-none" to='/createcount' >Criar uma conta</Link>
      <Link className="d-block mt-2 text-decoration-none" to='/resetpassword' >Esqueci minha senha</Link>
    </div>
  </form>
  </div>

  )
}

export default Login;