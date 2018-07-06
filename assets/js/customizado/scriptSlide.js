function comeco() {
    document.getElementById('imgId').src = array1[0]
    document.form.texto.value = "0"
};

function mais() {
    document.form.texto.value = Math.floor(1 + 1 - 2 + (document.form.texto.value) * 1 + 1)
    if (document.form.texto.value >= array1.length) { document.form.texto.value = 0 }
};

function menos() {
    document.form.texto.value = Math.floor(1 + 1 - 2 + (document.form.texto.value) * 1 - 1)
    if (document.form.texto.value < 0) { document.form.texto.value = array1.length }
};

function regular() {
    document.getElementById('imgId').src = array1[document.form.texto.value];
    setTimeout("regular()", 5)
};

setInterval("mais()", 3000);