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
        const Respuesta = await fetch("http://localhost:62392/api/Recarga?Documento=" + Documento,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtNombre").val(Rpta.NombreCompleto);
        $("#cboRecarga").val(Rpta.ValorRecarga);
        $("#txtValorRecarga").val(Rpta.ValorRecarga);
        $("#txtValorIncremento").val(Rpta.ValorIncremento);
        $("#txtTotalRecarga").val(Rpta.TotalRecarga);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    let Documento = $("#txtDocumento").val();
    let Nombre = $("#txtNombre").val();
    let ValorRecarga = $("#cboRecarga").val();
    let ValorIncremento = $("#txtValorIncremento").val();
    let TotalRecarga = $("#txtTotalRecarga").val();

    let DatosRecarga = {
        Documento: Documento,
        NombreCompleto: Nombre,
        ValorRecarga: ValorRecarga,
        ValorIncremento: ValorIncremento,
        TotalRecarga: TotalRecarga
    }

    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:62392/api/Recarga",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosRecarga)
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