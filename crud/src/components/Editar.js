import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../servicios/api';

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            datosCargados: false,
            paciente:[]
        }
    }

    cambioValor= (e) => {


        const state=this.state.paciente;

        state[e.target.name]=e.target.value;
        this.setState({paciente:state});
    }

    
    enviarDatos = (e) => {
        e.preventDefault();
        console.log("formulario enviado.....");

        const{id, documento, nombres, apellidos, correo, telefono,sexo,edad,notas,fecha}=this.state.paciente;
        console.log(id, documento, nombres, apellidos, correo, telefono,sexo,edad,notas,fecha);

        var datosEnviar = {
            id:id,
            documento:documento, 
            nombres:nombres,
            apellidos:apellidos,
            correo:correo,
            telefono:telefono,
            sexo:sexo,
            edad:edad,
            notas:notas,
            fecha:fecha
        }

        fetch(Api+"?actualizar=1", {
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })

        .then(respuesta => respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta);
            this.props.history.push("/");
        })
        
        .catch(console.log)

    }
    //componentDidMount
    componentWillUnmount(){

        console.log(this.props.match.params.id);

         fetch(Api+"?consultar="+this.props.match.params.id)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta)

            this.setState({
                datosCargados: true,
                paciente:datosRespuesta[0]})
        })
        
        .catch(console.log)
    }
   
    render() { 

        const{datosCargados, paciente}=this.state;

        if(!datosCargados){return (<div>Cargando....</div>)}
        else{

        return ( <div className="card">
            <div className="card-header">
                Editar clientes
            </div>
            <div className="card-body">
                

                <form onSubmit={this.enviarDatos}>

                        <div className="form-group">
                        <label htmlFor="">clave:</label>
                        <input type="text" readOnly className="form-control" value={paciente.id} onChange={this.cambioValor}/>
                        <small id="helpId" class="text-muted">ID</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">N° Documento:</label>
                            <input required type="text" name="documento" onChange={this.cambioValor} value={paciente.documento} id="documento" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nombres:</label>
                            <input required type="text" name="nombres" onChange={this.cambioValor} value={paciente.nombres} id="nombres" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Apellidos:</label>
                            <input required type="text" name="apellidos" onChange={this.cambioValor} value={paciente.apellidos} id="apellidos" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Correo:</label>
                            <input required type="text" name="correo" onChange={this.cambioValor} value={paciente.correo} id="correo" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Telefono:</label>
                            <input required type="text" name="telefono" onChange={this.cambioValor} value={paciente.telefono} id="telefono" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Sexo:</label>
                            <input required type="text" name="sexo" onChange={this.cambioValor} value={paciente.sexo} id="sexo" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Edad:</label>
                            <input required type="text" name="edad" onChange={this.cambioValor} value={paciente.edad} id="edad" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Notas:</label>
                            <input required type="text" name="notas" onChange={this.cambioValor} value={paciente.notas} id="notas" className="form-control" placeholder="" aria-describedby="helpId" />
                            <small id="helpId" className="text-muted">Escribe el asunto de la cita</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Fecha:</label>
                            <input required type="text" name="fecha" onChange={this.cambioValor} value={paciente.fecha} id="fecha" className="form-control" placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Actualizar</button>
                            <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                        </div>
                    
                    </form>

            </div>
            <div className="card-footer text-muted">
            </div>
        </div> );

        }
    }
}
 
export default Editar;