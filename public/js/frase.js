$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $("#spinner").toggle(); //mostrando o spinner
    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function () {
        $("#erro").toggle();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2500);
    }).always(function () { //sempre escondendo o spinner
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}