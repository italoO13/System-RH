import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar= () => {
  return(
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid mx-3 justify-content-start">
        <div className="navbar-brand">System RH</div>
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target='#menuHamb'  aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuHamb">
          <ul className="navbar-nav mx-1">
            <li className="nav-item">
              <Link class="nav-link active" aria-current="page" to='/home'>Funcionários</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" aria-current="page"  to='/dashboard'>DashBoard</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" aria-current="page"  to='/'>Sair</Link>
            </li>
            <li className="nav-item">
              <Link class="nav-link" aria-current="page"  to='/config'>Config</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;