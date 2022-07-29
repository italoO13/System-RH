import React, {useContext} from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import './NavBar.css';

const NavBar= () => {
  const {loginSave} = useContext(AppContext);
  const {pathname} = useLocation();
  return(
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid mx-3 justify-content-start">
        <div className="navbar-brand">System RH</div>
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target='#menuHamb'  aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuHamb">
          <ul className="navbar-nav mx-1">
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/home' && 'active'}`} aria-current="page" to='/home'>Funcionários</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/dashboard' && 'active'}`} aria-current="page"  to='/dashboard'>DashBoard</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathname === '/config/area' && 'active'}`} aria-current="page"  to='/config/area'>Config</Link>
            </li>
            <li className="nav-item" >
              <Link className={`nav-link ${pathname === '/logout' && 'active'}`} aria-current="page"  to='/logout'>Sair</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* {(loginSave.success === false || loginSave.success ==='') &&
      <Navigate to="/"/>
      } */}
    </nav>
  )
}

export default NavBar;