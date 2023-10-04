jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
    //Registrar los botones para responder al evento click
    $("#btnInsertar").on("click", function () {
        EjecutarComandos("POST");
    });
    $("#btnActualizar").on("click", function () {
        EjecutarComandos("PUT");
    });
    $("#btnEliminar").on("click", function () {
        EjecutarComandos("DELETE");
    });
    $("#btnConsultar").on("click", function () {
        Consultar();
    });
});
async function Consultar() {
    let Documento = $("#txtDocumento").val();
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:62392/api/Empleado?Documento=" + Documento,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtNombre").val(Rpta.Nombre);
        $("#txtPrimerApellido").val(Rpta.PrimerApellido);
        $("#txtSegundoApellido").val(Rpta.SegundoApellido);
        let Fecha = Rpta.FechaNacimiento;
        if (Fecha != undefined) {
            $("#txtFechaNacimiento").val(Fecha.split('T')[0]);
        }
        $("#txtTelefono").val(Rpta.Telefono);
        $("#txtDireccion").val(Rpta.Direccion);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    let Documento = $("#txtDocumento").val();
    let Nombre = $("#txtNombre").val();
    let PrimerApellido = $("#txtPrimerApellido").val();
    let SegundoApellido = $("#txtSegundoApellido").val();
    let FechaNacimiento = $("#txtFechaNacimiento").val();
    let Telefono = $("#txtTelefono").val();
    let Direccion = $("#txtDireccion").val();

    let DatosEmpleado = {
        Documento: Documento,
        Nombre: Nombre,
        PrimerApellido: PrimerApellido,
        SegundoApellido: SegundoApellido,
        FechaNacimiento: FechaNacimiento,
        Telefono: Telefono,
        Direccion: Direccion
    }

    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:62392/api/Empleado",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosEmpleado)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}