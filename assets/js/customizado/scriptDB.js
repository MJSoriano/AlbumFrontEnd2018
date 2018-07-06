var tbAlbum = localStorage.getItem("tbAlbum");// Recupera os dados armazenados
tbAlbum = JSON.parse(tbAlbum); // Converte string para objeto
if (tbAlbum == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    tbAlbum = [];

var tbImagens = localStorage.getItem("tbImagens");// Recupera os dados armazenados
tbImagens = JSON.parse(tbImagens); // Converte string para objeto
if (tbImagens == null) // Caso não haja conteúdo, iniciamos um vetor vazio
    tbImagens = [];

$(function () {
    var $container1 = $('#areaAlbuns');
    var i = 0;
    var retornoItensSlideShow = "";

    for (var i in tbAlbum) {
        var alblist = JSON.parse(tbAlbum[i]);

        $container1.append('<div class="panel-group" id="accordion_' + alblist.idAlb + '" role="tablist" aria-multiselectable="true">'
            + '<div class="panel panel-default"><div class="panel-heading" role="tab" id="headingOptions"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion_' + alblist.idAlb + '" href="#collapseOptions_' + alblist.idAlb + '" aria-expanded="false" aria-controls="collapseOptions_' + alblist.idAlb + '">'
            + '<i class="glyphicon glyphicon-camera"></i>&nbsp;' + alblist.nmAlb + '</a></h4></div><div id="collapseOptions_' + alblist.idAlb + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOptions"><div class="panel-body"><div class="form-horizontal">'
            + '<div id="lista_' + alblist.idAlb + '"></div></div></div></div></div></div>');

        var $container2 = $('#lista_' + alblist.idAlb);

        $container2.append('<div class="row"><div class="col-sm-12 text-right">'
            + '<div>'
            + '<button type="button" class="btn btn-link" onclick="criarVisualizacao(\'' + alblist.idAlb + '\')">Ver no slide show &nbsp;<i class="glyphicon glyphicon-play"></i></button>'
            + '</div></div></div>');

        listaAlbum.push(alblist.nmAlb);
    }

    var $container2 = "";

    for (var i in tbImagens) {
        var imglist = JSON.parse(tbImagens[i]);
    $container2 = $('#lista_' + imglist.nomeAlbum);
    $container2.append('<div class="image-float-wrapper image vertical-image">'
        + '<div>'
        + '<img id="" class="imgAlbum" src="' + imglist.urlImagem + '" title="' + imglist.nomeAlbum + '">'
        + '</div></div>');
    }

    $('#albumAdd').empty();
    renderAlbuns();
});

function Adicionar(alb, img) {
    var imagem = JSON.stringify({
        nomeAlbum: alb,
        urlImagem: img
    });

    tbImagens.push(imagem);
    localStorage.setItem("tbImagens", JSON.stringify(tbImagens));
    return true;
};

function preenchimento(alb){
    var i = 0;
    
    array1 = [];

    for (var i in tbImagens) {
        var lst = JSON.parse(tbImagens[i]);
        if (lst.nomeAlbum == alb) {
            array1.push(lst.urlImagem);
        }
    }
};

function DBCriarAlbum(alb, idalb) {
    var albumDB = JSON.stringify({
        nmAlb: alb,
        idAlb: idalb
    });

    tbAlbum.push(albumDB);
    localStorage.setItem("tbAlbum", JSON.stringify(tbAlbum));
    return true;
};