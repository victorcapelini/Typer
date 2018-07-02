var frase = $(".frase").text();
var numeroDePalavras = frase.split(/\S+/).length - 1;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numeroDePalavras);

var campo = $(".campo-digitacao");

campo.on("input", function () {
    var conteudo = campo.val();

    var quantidadePalavras = conteudo.split(/\S+/).length - 1;

    $("#contador-palavras").text(quantidadePalavras);
    $("#contador-caracteres").text(conteudo.length);
});

var tempoRestante = $("#tempo-digitacao").text();

campo.one("focus", function () {
    var cronometroID = setInterval(function () {
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if (tempoRestante < 1) {
            campo.attr("disabled", true);
            clearInterval(cronometroID);
        }
    }, 1000);
});