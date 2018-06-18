/* Fetch functions */

var API_URL = 'https://api.shutterstock.com/v2';
var pesquisaFlag = "false";

// Base 64 encode Client ID and Client Secret for use in the Authorization header
function encodeAuthorization() {
    var clientId = $('input[name=client_id]').val();
    var clientSecret = $('input[name=client_secret]').val();

    if (!clientId || !clientSecret) {
        $('#collapseAuthentication').collapse('show');
        alert('Client id and/or client secret are missing in the API key section, with out these you wont be able to contact the API.');
        return;
    }
    return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
}

// Search media by type
function search(opts, mediaType) {
    var $container = $('#' + mediaType + '-search-results');
    var createComponentFunc = mediaType === 'image' ? renderImageComponent : null;

    authorization = encodeAuthorization();
    if (!authorization) return;

    var jqxhr = $.ajax({
        url: API_URL + '/' + mediaType + 's/search',
        data: opts,
        headers: {
            Authorization: authorization
        }
    })
        .done(function (data) {
            if (data.total_count === 0) {
                $container.append('<p>Nenhum resultado a ser exibido</p>');
                return;
            }

            var minHeightCSS = /horizontal/.test(opts) ? 'horizontal-image' : 'vertical-image';
            $.each(data.data, function (i, item) {
                var component = createComponentFunc(item, minHeightCSS);
                $container.append(component);
            });

            // Reduce the options area to show the results
            if (window.innerWidth < 700) $('.collapse.in').collapse();
        })
        .fail(function (xhr, status, err) {
            alert('Failed to retrieve ' + mediaType + ' search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
        });

    return jqxhr;
}

// Fetch media details
function fetchDetails(event) {
    event.preventDefault();

    var id = event.target.id;
    var mediaType = event.target.tagName === 'IMG' ? 'image' : null;
    var authorization = encodeAuthorization();

    if (!id || !authorization) return;

    renderLoadingDetails(id);

    var jqxhr = $.ajax({
        url: API_URL + '/' + mediaType + 's/' + id,
        headers: {
            Authorization: authorization
        }
    })
        .done(function (data) {
            console.log('JSON response', data);

            if (!data || !data.assets || !data.assets) return;

            renderDetails(data);
        })
        .fail(function (xhr, status, err) {
            alert('Failed to retrieve ' + mediaType + ' details:\n' + JSON.stringify(xhr.responseJSON, null, 2));
        });

    return jqxhr;
}

/* Render functions */

// Create image wrapper component
function renderImageComponent(image, minHeightCSS) {
    if (!image || !image.assets || !image.assets.large_thumb || !image.assets.large_thumb.url) return;

    var wrapper = $('<div>');
    var thumbWrapper = $('<div>');
    var thumbnail = $('<img>');
    var description = $('<p>');

    $(thumbnail)
        .click(fetchDetails)
        .attr('id', image.id)
        .attr('src', image.assets.large_thumb.url)
        .attr('title', image.description);

    $(thumbWrapper)
        .addClass('thumbnail-crop')
        .css('height', image.assets.large_thumb.height)
        .css('width', image.assets.large_thumb.width)
        .append(thumbnail);

    $(wrapper)
        .addClass('image-float-wrapper image ' + minHeightCSS)
        .append(thumbWrapper);

    return wrapper;
}

// Display media details in a modal
function renderDetails(data) {
    var detailTemplate = $('.detail-template');
    detailTemplate.find('.modal-body').html('<div></div><p><strong>Keywords: </strong><small></small></p>')

    if (data.media_type === 'image') {
        var thumbWrapper = $('<div>');
        var thumbnail = $('<img>');

        $(thumbnail)
            .click(fetchDetails)
            .attr('id', data.id)
            .attr('src', data.assets.preview.url)
            .attr('title', data.description);

        $(thumbWrapper)
            .addClass('thumbnail-crop')
            .css('height', data.assets.preview.height)
            .css('width', data.assets.preview.width)
            .append(thumbnail);

        detailTemplate.find('.modal-body').find('div')
            .append(thumbWrapper)
    }

    detailTemplate.find('h3').html(data.description);
    detailTemplate.find('small').html(data.keywords.join(', '));

    document.getElementById('idFoto').value = data.assets.preview.url;
}

// Render a loading spinner while we wait for image/video details
function renderLoadingDetails(id) {
    var detailTemplate = $('.detail-template');

    detailTemplate.find('.modal-body').html('<i class="fa fa-5x fa-spinner fa-spin"></i>')
    detailTemplate.find('h3').html('Loading ' + id + '...');
    detailTemplate.modal('show');
}

// Add categories to the category <select>
function renderCategories() {
    var categorySelect = $('[name="category"]')[0];
    ['Abstract', 'Animals/Wildlife', 'Backgrounds/Textures', 'Beauty/Fashion', 'Buildings/Landmarks', 'Business/Finance', 'Celebrities', 'Editorial', 'Education', 'Food and Drink', 'Healthcare/Medical', 'Holidays', 'Illustrations/Clip-Art', 'Industrial', 'Interiors', 'Miscellaneous', 'Model Released Only', 'Nature', 'Objects', 'Parks/Outdoor', 'People', 'Religion', 'Science', 'Signs/Symbols', 'Sports/Recreation', 'Technology', 'The Arts', 'Transportation', 'Vectors', 'Vintage'].map(function (category) {
        categorySelect.add(new Option(category, category));
    });
}

function setDefaultPerPage() {
    var imagesWhichFitOnThePage = (window.innerWidth * window.innerHeight) / (200 * 200);
    var bestPerPage;

    $('select[name=per_page]')
        .find('option')
        .each(function () {
            if (this.value < imagesWhichFitOnThePage) {
                bestPerPage = this.value;
            }
        });

    if (bestPerPage) {
        $('select[name=per_page]').val(bestPerPage);
    }
}

function setColor(target) {
    $("input[name=color]").val(target.value);
}

function useColorsInNatureIfSearchingOnlyByColor(opts) {
    if (/color/.test(opts) & !/category/.test(opts) && !/query/.test(opts)) {
        opts += '&category=Nature';
    }
    return opts;
}

function pesquisa(item) {
    Menu('buscarImagens');
    pesquisaFlag = "true";
    $('#search-form').submit();
}

// On Page Load
$(function () {
    renderCategories();
    setDefaultPerPage();

    $('#search-form').submit(function (e) {
        e.preventDefault();

        // Clear current media results
        $('#image-search-results').empty();

        if (pesquisaFlag == "true") {
            document.getElementById('query').value = document.getElementById('pesquisatxt').value;
            pesquisaFlag = false;
            document.getElementById('pesquisatxt').value = "";
        }

        // Serialize form options
        var opts = $('input').filter(function () {
            if (this.value === '#999999') return;
            if (this.name === 'client_id') return;
            if (this.name === 'client_secret') return;
            return !!this.value;
        }).serialize();

        opts += '&' + $('select').filter(function () {
            return !!this.value;
        }).serialize();
        opts = useColorsInNatureIfSearchingOnlyByColor(opts);
        console.log('Requesting: ' + opts)

        // Search and display images
        search(opts, 'image');

        // Reduce # videos to better fit on the page
        var perPage = $('select[name=per_page]').val();
        if (perPage > 24) {
            opts = opts.replace('per_page=' + perPage, 'per_page=' + perPage / 2);
        }

        return false;
    });
    $('#search-form').submit();
});