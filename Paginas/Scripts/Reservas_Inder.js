jQuery(function () {
    $("#btnMostrarValores").on("click",function(){
        CalcularValores();
    });

});

async function CalcularValores() {
    // Capturar datos de entrada
    let Documento = $("#txtDocumentoCliente").val();
    let Nombre = $("#txtNombreCliente").val();
    let DiaReserva = $("#txtFecha").val();
    let Horas = $("#txtNumeroHoras").val();

    // Confirmar que se estén tomando los datos
    //alert("CantidadHoras: " + Horas + "\n" +
    //    "Documento Cliente: " + Documento + "\n" +
    //    "Nombre Cliente: " + Nombre + "\n" +
    //    "DiaSemana: " + DiaReserva);

    //mostrar Error
    

    // JSON (Nombre: Valor)
    let DatosReserva = {
        "CantidadHoras": Horas,
        "DocumentoCliente": Documento,
        "NombreCliente": Nombre,
        "DiaSemana": DiaReserva
    };

    try {
        const RespuestaServicio = await fetch("http://localhost:62392/api/Reserva", {
            // Url a tu servicio
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json" // Cambiado ":" por "="
            },
            body: JSON.stringify(DatosReserva)
        });
        
        // Lee la respuesta y guárdala en una variable
        const Respuesta = await RespuestaServicio.json();
        if (Respuesta.Error != "") {
            $("#dvMensaje").html(Respuesta.Error);
            $("#txtValorSinDescuento").val("");
            $("#txtValorDescuento").val("");
            $("#txtValorAPagar").val("")
        }
        else {
            $("#txtValorSinDescuento").val(Respuesta.ValorReservaSinDescuento);
            $("#txtValorDescuento").val(Respuesta.ValorDescuento);
            $("#txtValorAPagar").val(Respuesta.ValorAPagar)
            $("#dvMensaje").html(""); 
        }
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}
