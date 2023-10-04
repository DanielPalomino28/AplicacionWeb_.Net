jQuery(function () {
    $("#btnCalcularValores").on("click",function(){
        CalcularValores();
    });

});

async function CalcularValores() {
    // Capturar datos de entrada
    let ValorComercial = $("#txtValorComercial").val();
    let ReclamacionesAnio = $("#txtReclamacionesPorAnio").val();

    //Confirmar que se estén tomando los datos
    //alert("Valor comercial: " + ValorComercial + "\n" +
    //    "Cantidad reclamaciones: " + ReclamacionesAnio);

    

    // JSON (Nombre: Valor)
    let DatosSeguroV = {        
        "ValorComercial": ValorComercial,
        "ReclamacionesAnioAnterior": ReclamacionesAnio
    };

    try {
        const RespuestaServicio = await fetch("http://localhost:62392/api/SeguroVehiculos", {
            // Url a tu servicio
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json" // Cambiado ":" por "="
            },
            body: JSON.stringify(DatosSeguroV)
        });
        
        // Lee la respuesta y guárdala en una variable
        const Respuesta = await RespuestaServicio.json();
        if (Respuesta.Error != "") {
            $("#txtValorBase").val("");
            $("#txtValorIncremento").val("");
            $("#txtValorAntesDeIva").val("")
            $("#txtValorIva").val("")
            $("#txtValorAPagar").val("")
            $("#dvMensaje").html(Respuesta.Error);
        }
        else {
            $("#txtValorBase").val(Respuesta.ValorBase);
            $("#txtValorIncremento").val(Respuesta.ValorIncremento);
            $("#txtValorAntesDeIva").val(Respuesta.ValorAntesIva);
            $("#txtValorIva").val(Respuesta.ValorIva);
            $("#txtValorAPagar").val(Respuesta.ValorAPagar);
            $("#dvMensaje").html("");
        }
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}
