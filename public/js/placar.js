function inserePlacar() {
    var placar = $(".placar");
    var corpoTabla = placar.find("tbody");
    var usuario = $("#nomeUsuario").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);



    corpoTabla.prepend(linha);
}

function novaLinha(nomeUsuario, numPalavras) {
    var linha = $("<tr>");
    var colUsuario = $("<td>").text(nomeUsuario);
    var colNumPalavras = $("<td>").text(numPalavras);
    var colBtnRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colBtnRemover.append(link);

    linha.append(colUsuario);
    linha.append(colNumPalavras);
    linha.append(colBtnRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}