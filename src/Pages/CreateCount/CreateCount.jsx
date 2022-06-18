import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import './CreateCount.css'


const CreateCount = () =>{ 
  const [email, setEmail] = useState();
  const [password, setPassword]= useState('');
  const [menssage, setMenssage] = useState('');

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    if(!email) {
      throw setMenssage('Campo de email vazio !')
    }
    if(!re.test(email)) {
      throw setMenssage("Email Inválido !")
    }
  }

  const validatePassword = () => {
    if(password.length<6) {
      throw setMenssage("Senha deve ser maior que 5 caracteres")
    }
  }

  const registerUser =async () => {
    setMenssage(''); 
    try {
      validateEmail();
      validatePassword();
      setMenssage('success')
      await createUserWithEmailAndPassword(getAuth(), email, password)

    }catch(e) {
      setMenssage(e.message)
    }
  }

  return(
    <div className="Login container d-flex justify-content-center pt-5">
      <form className="create-count-form">
        <img className="mb-4" src="https://uploads-ssl.webflow.com/6250999dc9bea957c03e3e1f/6250999dc9bea955563e3e31_terceirizacao-de-rh.png" alt="login RH" width="150px"/>
        <h1 className="h3 mb-3 fw-normal">Criar Conta</h1>

        <div className="form-floating ">
          <input type="email" className="form-control" id="floatingInput" onChange={({target})=> setEmail(target.value)} placeholder="name@example.com"/>
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-2">
          <input type="password" className="form-control" onChange={({target}) => setPassword(target.value)} id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Senha</label>
        </div>
        <button onClick={registerUser} className="w-100 btn btn-lg btn-primary" type="button">Criar Conta</button>
        {menssage.length > 0 && menssage !== 'success' ? <div  className="alert alert-danger mt-2" role='alert'>
          {menssage}
        </div>: null}
        {menssage === 'success' ? (
          <>
          <div  className="alert alert-success mt-2" role='alert'>
          Conta criada com sucesso !
          </div>
          <Navigate to="/"/>
          </>
        ): null}
        <Link className="d-block mt-2 text-decoration-none" to='/' >Já tenho uma conta</Link>
      </form>
      </div>

  )
}

export default CreateCount;