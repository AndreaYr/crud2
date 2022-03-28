import './App.css';
import Listar from './components/Listar';
import Crear from './components/Crear';
import Editar from './components/Editar';

import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

//import { Routes, BrowserRouter as Router} from "react-router-dom";
//import { Link } from "react-router-dom";


function App() {
  return (



    <Router>
      <div className='container'>
        <nav className="navbar navbar-expand navbar-light bg-light">
              <div className="nav navbar-nav">
                  <Link className="nav-item nav-link active" to={"/"}>sistema<span className="sr-only"></span></Link>
                  <Link className="nav-item nav-link" to={"/crear"}>Crear Cita</Link>
                  <Link className="nav-item nav-link" to={"/editar"}>Editar Cita</Link>

              </div>
        </nav>

        <Listar></Listar>
        <Crear></Crear>
        <Editar></Editar>
        <Routes>
          <Route exact path='/' element={<Listar/>}></Route>
          <Route path='/crear' element={<Crear />}></Route>
          <Route path='/editar/:id' element={<Editar/>}></Route>
              
        </Routes>
      </div>

    </Router>
  );
}

export default App;
