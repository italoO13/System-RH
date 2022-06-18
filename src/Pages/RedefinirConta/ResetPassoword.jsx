import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import './ResetPassoword.css';


const ResetPassword = () => {
  const [email, setEmail] = useState();
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


  const resetpasswordFirebase = async() => {
    setMenssage('');
    try{
      validateEmail();
      await sendPasswordResetEmail(getAuth(), email);
      setMenssage('sucess')
    }catch(e) {
      setMenssage(e.message);
    }
  }

  return(
  <div className="Login container d-flex justify-content-center pt-5">
    <form >
      <img className="mb-4" src="https://uploads-ssl.webflow.com/6250999dc9bea957c03e3e1f/6250999dc9bea955563e3e31_terceirizacao-de-rh.png" alt="login RH" width="150px"/>
      <h1 className="h3 mb-3 fw-normal">Recuperar Senha</h1>

      <div className="form-floating ">
        <input type="email" onChange={({target}) => setEmail(target.value)} className="form-control" id="floatingInput" placeholder="name@example.com"/>
        <label htmlFor="floatingInput">Email</label>
      </div>
      <button className="w-100 btn btn-lg btn-primary mt-2"  onClick={resetpasswordFirebase} type="button">Enviar</button>
      {menssage.length > 0 && menssage !== 'sucess' ? <div  className="alert alert-danger mt-2" role='alert'>
          {menssage}
        </div>: null}
      {menssage === 'sucess' ? <div  className="alert alert-success mt-2" role='alert'>
          Requisição para alterar senha enviado para o seu Email ! Verifique o span
        </div>: null}
      
      <Link className="d-block mt-2 text-decoration-none" to='/' >Fazer Login</Link>

    </form>
  </div>


  )
}

export default ResetPassword;