jQuery(function () {
    $("#btnCalcularValores").on("click",function(){
        CalcularValores();
    });

});

async function CalcularValores() {
    // Capturar datos de entrada
    let cAgua = $("#txtConsumoAgua").val();
    let cGas = $("#txtConsumoGas").val();
    let cEnergia = $("#txtConsumoEnergia").val();

    //Confirmar que se estén tomando los datos
        //alert("Consumo agua: " + cAgua + "\n" +
        //    "Consumo gas: " + cGas + "\n" +
        //    "Consumo energía: " + cEnergia);

    

    // JSON (Nombre: Valor)
    let DatosConsumo = {
        "ConsumoAgua": cAgua,
        "ConsumoGas": cGas,
        "ConsumoEnergia": cEnergia
    };

    try {
        const RespuestaServicio = await fetch("http://localhost:62392/api/ServiciosEpm", {
            // Url a tu servicio
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json" // Cambiado ":" por "="
            },
            body: JSON.stringify(DatosConsumo)
        });
        
        // Lee la respuesta y guárdala en una variable
        const Respuesta = await RespuestaServicio.json();
        if (Respuesta.Error != "") {
            $("#txtValorTotalAgua").val("");
            $("#txtValorTotalGas").val("");
            $("#txtValorTotalEnergia").val("")
            $("#txtValorSubTotal").val("")
            $("#txtValorDescuento").val("")
            $("#txtValorRecargo").val("")
            $("#txtValorAPagar").val("")
            $("#dvMensaje").html(Respuesta.Error);
        }
        else {
            $("#txtValorTotalAgua").val(Respuesta.ValorTotalAgua);
            $("#txtValorTotalGas").val(Respuesta.ValorTotalGas);
            $("#txtValorTotalEnergia").val(Respuesta.ValorTotalEnergia)
            $("#txtValorSubTotal").val(Respuesta.ValorTotalSinDescuento)
            $("#txtValorDescuento").val(Respuesta.ValorDescuento)
            $("#txtValorRecargo").val(Respuesta.ValorRecargo)
            $("#txtValorAPagar").val(Respuesta.ValorTotalAPagar) 
            $("#dvMensaje").html("");
        }
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}
