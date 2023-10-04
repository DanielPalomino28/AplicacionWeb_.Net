jQuery(function () {
    $("#btnCalcularValores").on("click",function(){
        CalcularValores();
    });

});

async function CalcularValores() {
    // Capturar datos de entrada
    let comboHyG = $("#txtComboHyG").val();
    let comboPeyG = $("#txtComboPeyG").val();
    let comboPayG = $("#txtComboPayG").val();

    //Confirmar que se estén tomando los datos
    //alert("Combos Hamburguesa y gaseosa : " + comboHyG + "\n" +
    //    "Combos Perro y gaseosa: " + comboPeyG + "\n" +
    //    "Combos Paste y gaseosa: " + comboPayG);

    

    // JSON (Nombre: Valor)
    let DatosCombos = {        
        "CantidadCombosHyG": comboHyG,
        "CantidadCombosPeyG": comboPeyG,
        "CantidadCombosPayG": comboPayG
    };

    try {
        const RespuestaServicio = await fetch("http://localhost:62392/api/CafeteriaITM", {
            // Url a tu servicio
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json" // Cambiado ":" por "="
            },
            body: JSON.stringify(DatosCombos)
        });
        
        // Lee la respuesta y guárdala en una variable
        const Respuesta = await RespuestaServicio.json();
        if (Respuesta.Error != "") {
            $("#txtValorOriginal").val("");
            $("#txtValorDescuento").val("");
            $("#txtValorAPagar").val("")
            $("#dvMensaje").html(Respuesta.Error);
        }
        else {
            $("#txtValorOriginal").val(Respuesta.ValorOriginal);
            $("#txtValorDescuento").val(Respuesta.ValorDescuento);
            $("#txtValorAPagar").val(Respuesta.ValorTotalAPagar);
            $("#dvMensaje").html("");
        }
    } catch (error) {
        $("#dvMensaje").html(error);
    }
}
