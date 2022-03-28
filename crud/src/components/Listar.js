import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";


class Listar extends React.Component{
    constructor(props){
        super(props);
        this.state = { datosCargados: false,
            pacientes: []
        }
    }

    borrarRegistros = (id) =>{
        console.log(id);

        fetch(Api+"?borrar="+id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta)
            this.cargarDatos();
        })
        
        .catch(console.log)
    }


    cargarDatos(){
        fetch(Api)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta)
            this.setState({datosCargados: true, pacientes:datosRespuesta})
        })
        
        .catch(console.log)
    }

    componentDidMount(){
        this.cargarDatos();

    }

    render(){ //mostrar conenido

        const{datosCargados, pacientes}=this.state
        if(!datosCargados){return (<div>Cargando....</div>)}
        else{


            return ( 
            
            <div className="card">
                <div className="card-header">
                <Link className="btn btn-success" to={"/crear"}>Agregar nueva cita</Link>

                </div>
                <div className="card-body">
                    <h4>Lista de Pacientes</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Documento</th>
                                <th>nombres</th>
                                <th>apellidos</th>
                                <th>email</th>
                                <th>telefono</th>
                                <th>sexo</th>
                                <th>edad</th>
                                <th>notas</th>
                                <th>fecha</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                pacientes.map(
                                    (paciente)=>(
                                    <tr key={paciente.id}>
                                    <td>{paciente.id}</td>
                                    <td>{paciente.documento}</td>
                                    <td>{paciente.nombres}</td>
                                    <td>{paciente.apellidos}</td>
                                    <td>{paciente.correo}</td>
                                    <td>{paciente.telefono}</td>
                                    <td>{paciente.sexo}</td>
                                    <td>{paciente.edad}</td>
                                    <td>{paciente.notas}</td>
                                    <td>{paciente.fecha}</td>
                                    <th>
                                        <div className="btn-group" aria-label="">
                                            <Link className="btn btn-warning" 
                                            to={"/editar/"+paciente.id} >Editar</Link>

                                            <button type="button" className="btn btn-danger" 
                                            onClick={()=>this.borrarRegistros(paciente.id)}
                                            >Borrar</button>
                                        </div>
                                    </th>

                                </tr>
                                )
                            )}  
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-muted">
                
                </div>
            </div>);
        }
    }
}

export default Listar;