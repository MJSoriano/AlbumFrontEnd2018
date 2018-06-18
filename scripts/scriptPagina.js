var listaAlbum = [];

function Menu(el) {
    var paginas = ["buscarImagens", "minhasImagens", "creditosPagina"];

    for (var i = 0; i < paginas.length; i++) {
        var display = document.getElementById(paginas[i]).style.display;

        if (paginas[i] == el) {
            document.getElementById(paginas[i]).style.display = 'block'
        }
        else {
            document.getElementById(paginas[i]).style.display = 'none'
        }
    }
};

function trim(str) {
    var retorno = "";
    var i = 0;
    var aux = "";

    for (i == 0; i < str.length; i++) {

        if (str.charAt(i) == " ") {
            retorno += "_";
        }
        else {
            retorno += str.charAt(i);
        }
    }

    return retorno;
}

function renderAlbuns() {
    albunsSelect = $('[name="albumAdd"]')[0];
    listaAlbum.map(function (albumAdd) {
        albunsSelect.add(new Option(albumAdd, albumAdd));
    });
}

function criarAlbum() {
    var $container1 = $('#areaAlbuns');

    var nomeAlbumCriado = document.getElementById('nomeAlbumCriar').value;
    var parametroAlbum = trim(nomeAlbumCriado);

    if (listaAlbum.indexOf(parametroAlbum) != -1) {
        alert("O álbum " + nomeAlbumCriado + " já existe em sua galeria!")
    }
    else {
        if (nomeAlbumCriado != '') {
            $container1.append('<div class="panel-group" id="accordion_' + parametroAlbum + '" role="tablist" aria-multiselectable="true">'
                + '<div class="panel panel-default"><div class="panel-heading" role="tab" id="headingOptions"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion_' + parametroAlbum + '" href="#collapseOptions_' + parametroAlbum + '" aria-expanded="false" aria-controls="collapseOptions_' + parametroAlbum + '">'
                + '<i class="glyphicon glyphicon-camera"></i>&nbsp;' + nomeAlbumCriado + '</a></h4></div><div id="collapseOptions_' + parametroAlbum + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOptions"><div class="panel-body"><div class="form-horizontal">'
                + '<div id="lista_' + parametroAlbum + '"></div></div></div></div></div></div>');
        }

        var $container2 = $('#lista_' + parametroAlbum);

        $container2.append('<div class="row"><div class="col-sm-12 text-right">'
            + '<div>'
            + '<button type="button" class="btn btn-link" onclick="criarVisualizacao(\'' + parametroAlbum + '\')">Ver no slide show &nbsp;<i class="glyphicon glyphicon-play"></i></button>'
            + '</div></div></div>');

        listaAlbum.push(nomeAlbumCriado);
        $('#albumAdd').empty();
        renderAlbuns();

        DBCriarAlbum(nomeAlbumCriado, parametroAlbum);
    }
}

function adicionarAoAlbum(nome) {
    var nomeAlbumSelected = trim(document.getElementById('albumAdd').value);
    var nomeImagemSelected = document.getElementById('idFoto').value;

    if (nomeAlbumSelected != "Selecione o álbum") {
        criarLista(nomeAlbumSelected, nomeImagemSelected);
        alert("A imagem foi adicionada ao album " + document.getElementById('albumAdd').value)
    }
}

function copiarEnderecoImagem(id) {
    url = id.src;
    return url;
}

function criarLista(id, nome) {
    var $container2 = $('#lista_' + id);

    $container2.append('<div class="image-float-wrapper image vertical-image">'
        + '<div>'
        + '<img id="" class="imgAlbum" src="' + nome + '" title="' + nome + '">'
        + '</div></div>');

    Adicionar(id, nome);
}

function criarVisualizacao(nomeAlbumExibir) {
    preenchimento(nomeAlbumExibir);
    comeco();
    regular();
}