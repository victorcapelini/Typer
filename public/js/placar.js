$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#nomeUsuario").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);

    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate({ scrollTop: posicaoPlacar + "px" }, 500);
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
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function () {
        linha.remove();
    }, 1000);
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function () {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        // console.log(usuario);
        // console.log(palavras);

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function () {
        console.log("Salvou o placar!");
    })
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function () {
           var linha = novaLinha(this.usuario,this.pontos);
           linha.find(".botao-remover").click(removeLinha);
           $("tbody").prepend(linha);
        });
    })
}