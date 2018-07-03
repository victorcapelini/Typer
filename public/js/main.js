var tempoInicial = $("#tempo-digitacao").text();
var botaoReinicia = $("#botao-reiniciar");
$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    botaoReinicia.click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numeroDePalavras = frase.split(/\S+/).length - 1;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numeroDePalavras);
}
var campo = $(".campo-digitacao");

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();

        var quantidadePalavras = conteudo.split(/\S+/).length - 1;

        $("#contador-palavras").text(quantidadePalavras);
        $("#contador-caracteres").text(conteudo.length);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                botaoReinicia.attr("disabled", false);
                clearInterval(cronometroID);
            }
        }, 1000);
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    botaoReinicia.attr("disabled", true);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
}
