import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../servicios/api';

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documento: "",
            nombres: "",
            apellidos: "",
            correo: "",
            telefono: "",
            sexo: "",
            edad: "",
            notas: "",
            fecha: "",

            errores: []
         }
    }

    cambioValor= (e) => {
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({state,errores:[] });
    }

    verificarError(elemento){
        return  this.state.errores.indexOf(elemento) !==-1;
    }

    enviarDatos = (e) => {
        e.preventDefault();
        console.log("El formulario fue enviado");
    
        const{documento, nombres,apellidos,correo,telefono,sexo,edad,notas,fecha}=this.state;

        console.log(documento, nombres, apellidos, correo, telefono,sexo, edad, notas, fecha);

        var errores=[];
        if(!documento)errores.push("error_documento");
        if(!nombres)errores.push("error_nombres");
        if(!apellidos)errores.push("error_apellidos");
        if(!correo)errores.push("error_correo");
        if(!telefono)errores.push("error_telefono");
        if(!sexo)errores.push("error_sexo");
        if(!edad)errores.push("error_edad");
        if(!notas)errores.push("error_notas");
        if(!fecha)errores.push("error_fecha");
        
        this.setState({errores:errores});
        if(errores.length>0)return false;

        var datosEnviar = {
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

        fetch(Api+"?insertar=1", {
            method:"POST",
            body:JSON.stringify(datosEnviar),
        })

        .then(respuesta => respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta);
            this.props.history.push("/");
        })
        
        .catch(console.log)
    
    }


    render() { 

        const{documento, nombres,apellidos,correo,telefono,sexo,edad,notas,fecha}=this.state;

        return ( 

            <div className='card'>
                <div className='card-header'>
                    pacientes
                </div>
                <div className='card-body'>

                    <form onSubmit={this.enviarDatos}>

                        <div className="form-group">
                            <label htmlFor="">N° Documento:</label>
                            <input type="text" name="documento" onChange={this.cambioValor} value={documento} id="documento" className={ ((this.verificarError("error_documento"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nombres:</label>
                            <input type="text" name="nombres" onChange={this.cambioValor} value={nombres} id="nombres" className={ ((this.verificarError("error_nombres"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Apellidos:</label>
                            <input type="text" name="apellidos" onChange={this.cambioValor} value={apellidos} id="apellidos" className={ ((this.verificarError("error_apellidos"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Correo:</label>
                            <input type="text" name="correo" onChange={this.cambioValor} value={correo} id="correo" className={ ((this.verificarError("error_correo"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Telefono:</label>
                            <input type="text" name="telefono" onChange={this.cambioValor} value={telefono} id="telefono" className={ ((this.verificarError("error_telefono"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Sexo:</label>
                            <input type="text" name="sexo" onChange={this.cambioValor} value={sexo} id="sexo" className={ ((this.verificarError("error_sexo"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Edad:</label>
                            <input type="text" name="edad" onChange={this.cambioValor} value={edad} id="edad" className={ ((this.verificarError("error_edad"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Notas:</label>
                            <input type="text" name="notas" onChange={this.cambioValor} value={notas} id="notas" className={ ((this.verificarError("error_notas"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                            <small id="helpId" className="invalid-feedback">Escribe el asunto de la cita</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Fecha:</label>
                            <input type="text" name="fecha" onChange={this.cambioValor} value={fecha} id="fecha" className={ ((this.verificarError("error_fecha"))?"is-invalid":"" )+" form-control"} placeholder="" aria-describedby="helpId" />
                        </div>

                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agendar Nueva Cita</button>
                            <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                        </div>
                    
                    </form>
                </div>
                <div className='card-footer text-muted'>
                    


                </div>
            </div>
         );
    }
}
 
export default Crear;