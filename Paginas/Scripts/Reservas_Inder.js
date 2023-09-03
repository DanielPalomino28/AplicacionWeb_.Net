jQuery(function () {
    $("#btnMostrarValores").on("click",function(){
        CalcularValores();
    });

});

function CalcularValores() {
    //Capturar datos de entrada
    let Documento = $("#txtDocumentoCliente").val();
    let Nombre = $("#txtNombreCliente").val();
    let FechaReserva = $("#txtFecha").val();
    let Horas = $("#txtNumeroHoras").val();

    //Confirmar que si se estén tomando los datos
        alert("Documento: " + Documento + "\n"+
            "Nombre: " + Nombre + "\n" +
           "Fecha reserva: " + FechaReserva + "\n" +
           "Cantidad de horas: " + Horas
           );

    //Json (Nombre:Valor)
    let DatosReserva{
        DocumentoCliente: Documento,
        NombreCliente: Nombre,
        DiaSemana: FechaReserva,
        CantidadHoras: Horas,
    }

    //Invocar el servicio con ajax, utilizando la función fetch de javascript
    const RespuestaServicio = await fetch("http://localhost:62392/api/Reserva", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type:": "application/json"
        }
        body: JSON.stringify(DatosReserva)
    });
    //Leo la respuesta y la guardo en una variable
    const Respuesta = await RespuestaServicio.json();
    $("#txtValorSinDescuento").val(Respuesta.ValorReservaSinDescuento);
    $("#txtValorDescuento").val(Respuesta.ValorDescuento);
    $("#txtValorAPagar").val(Respuesta.ValorAPagar);
};