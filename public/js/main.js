var frase = $(".frase").text();
var numeroDePalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numeroDePalavras);

