var tempoInicial = $("#tempo-digitacao").text();
var botaoReinicia = $("#botao-reiniciar");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    marcaBorda();
    botaoReinicia.click(reiniciaJogo);
});

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

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
    campo.one("focus", function () {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                botaoReinicia.attr("disabled", false);
                clearInterval(cronometroID);
                campo.addClass("campo-desativado");
                inserePlacar();
            }
        }, 1000);
    });
}

function marcaBorda() {
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.removeClass("campo-errado");
            campo.addClass("campo-correto");
        } else {
            campo.removeClass("campo-correto");
            campo.addClass("campo-errado");
        }

    });
}

function reiniciaJogo() {
    if (campo.is('[disabled=disabled]')) {
        campo.attr("disabled", false);
        botaoReinicia.attr("disabled", true);
        campo.val("");
        $("#contador-palavras").text(0);
        $("#contador-caracteres").text(0);
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.removeClass("campo-desativado");
        campo.removeClass("campo-correto");
        campo.removeClass("campo-errado");
    }
}

