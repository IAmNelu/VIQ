function getIdFromNomeQuartiere(nome) {
    let nome_s = nome.split(" ");
    let nome_r;
    if (nome_s.length == 1) {
        nome_r = nome_s;
    }
    if (nome_s.length == 2) {
        nome_r = nome_s[0] + "_" + nome_s[1];
    }
    if (nome_s.length == 3) {
        nome_r = nome_s[0] + "_" + nome_s[1] + "_" + nome_s[2];
    }

    return nome_r;
}


function decimalToHex(decimal) {
    let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let conv = "",
        r1, r2, ris;
    decimal = Math.floor(decimal);
    if (decimal < 16) {
        conv = "0" + hex[decimal];
    } else {
        r1 = Math.floor(decimal % 16);
        ris = Math.floor(decimal / 16);
        r2 = Math.floor(ris % 16);
        conv = hex[r2] + hex[r1];
    }

    return conv;
}

/* READING FUNCTION AND ASYNCHRONOUS REQUEST */
///////////////////////////////////////////////

function loadASync(url, success) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)
            if (okStatus(xhr.status)) {
                success(xhr.responseText);
            } else {
                console.error("Request failed : " + url);
            }
    };
    xhr.send();
}

function okStatus(s) {
    return [200, 304].indexOf(s) >= 0;
}
///////////////////////////////////////////////


function getLayoutValues() {
    let valori = {
        width_g: 0,
        height_g: 0,
        width_all: 0,
        height_all: 0
    };
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    let h_map = $('#map_container')[0].clientHeight;
    let height_g = (h_map + 100) / 2;
    let width_g = 0;
    if (window.matchMedia("(orientation: portrait)").matches) {
        width_g = width - 50;
        height_g = height / 3;
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        if (width > 800) {
            width_g = width * 45 / 100;
        } else {
            width_g = width - 50;
        }
    }

    if (height > 800) {
        height = height * 45 / 100;
    } else {
        height = height - 50;
    }

    valori['width_g'] = width_g;
    valori['height_g'] = height_g;
    valori['width_all'] = width - 100;
    valori['height_all'] = height;

    return valori;

}

function getNomeQuartierfromId(id){

    let nome_s,nome_q;
    nome_s = id.split("_");

    if (nome_s.length == 1) {
        nome_q = nome_s[0];
    }
    if (nome_s.length == 2) {
        nome_q = nome_s[0] + " " + nome_s[1];
    }
    if (nome_s.length == 3) {
        nome_q = nome_s[0] + " " + nome_s[1] + " " + nome_s[2];
    }
    return nome_q;
}