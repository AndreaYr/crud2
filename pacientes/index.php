<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost";
$usuario = "root";
$contrasenia = "admin";
$nombreBaseDatos = "pacientes";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])) {
    $sqlPacientees = mysqli_query($conexionBD, "SELECT * FROM paciente WHERE id=" . $_GET["consultar"]);
    if (mysqli_num_rows($sqlPacientees) > 0) {
        $Pacientees = mysqli_fetch_all($sqlPacientees, MYSQLI_ASSOC);
        echo json_encode($Pacientees);
        exit();
    } else {
        echo json_encode(["success" => 0]);
    }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])) {
    $sqlPacientees = mysqli_query($conexionBD, "DELETE FROM paciente WHERE id=" . $_GET["borrar"]);
    if ($sqlPacientees) {
        echo json_encode(["success" => 1]);
        exit();
    } else {
        echo json_encode(["success" => 0]);
    }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if (isset($_GET["insertar"])) {
    $data = json_decode(file_get_contents("php://input"));
    $documento = $data->documento;
    $nombres = $data->nombres;
    $apellidos = $data->apellidos;
    $correo = $data->correo;
    $telefono = $data->telefono;
    $sexo = $data->sexo;
    $edad = $data->edad;
    $notas = $data->notas;
    $fecha = $data->fecha;


    $sqlPacientees = mysqli_query($conexionBD, "INSERT INTO paciente(documento, nombres, apellidos, correo, telefono, sexo, edad, notas, fecha) VALUES('$documento', '$nombres', '$apellidos','$correo', '$telefono', '$sexo', '$edad', '$notas', '$fecha')");
    echo json_encode(["success" => 1]);
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if (isset($_GET["actualizar"])) {

    $data = json_decode(file_get_contents("php://input"));

    $id = (isset($data->id)) ? $data->id : $_GET["actualizar"];
    $id = $data->id;
    $documento = $data->documento;
    $nombres = $data->nombres;
    $apellidos = $data->apellidos;
    $correo = $data->correo;
    $telefono = $data->telefono;
    $sexo = $data->sexo;
    $edad = $data->edad;
    $notas = $data->notas;
    $fecha = $data->fecha;

    $sqlPacientees = mysqli_query($conexionBD, "UPDATE paciente SET documento='$documento', nombres='$nombres', apellidos='$apellidos', correo='$correo', telefono='$telefono', sexo='$sexo', edad='$edad', notas='$notas', fecha='$fecha', WHERE id='$id'");
    echo json_encode(["success" => 1]);
    exit();
}
// Consulta todos los registros de la tabla empleados
$sqlPacientees = mysqli_query($conexionBD, "SELECT * FROM paciente ");
if (mysqli_num_rows($sqlPacientees) > 0) {
    $Pacientees = mysqli_fetch_all($sqlPacientees, MYSQLI_ASSOC);
    echo json_encode($Pacientees);
} else {
    echo json_encode([["success" => 0]]);
}