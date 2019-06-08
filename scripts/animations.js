let polys = [];
let texts = [];
let selected = [];
$(document).ready(function() {
    set_page_event_listeners();
    window.setTimeout("mapColor()", 150);
    window.setTimeout("colorQuartieri()", 155);
    window.setTimeout("plotTimeSanction('turin_temp')", 155);
    window.setTimeout("plotNeighborhoodSanction('turin_quartieri')", 160);
    window.setTimeout("plotTypeSanction('turin_type')", 165);
    window.onresize = setta_responsivita;
    setta_responsivita();

});

function setta_responsivita() {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log(width);
    let capo = $('#top_part')[0];
    let svg_l = $("#map_container")[0];
    let graphs_dx_l = $("#wrapper_destra")[0];
    if (width <= 800) {
        capo.appendChild(graphs_dx_l);
    } else {
        capo.appendChild(svg_l);
    }
    document.getElementById("top_part").contentWindow.location.reload(true);
    set_page_event_listeners();
}

function sparisciQuartiere(caller) {

    let in_polys = $("polygon");
    let in_texts = $("text");
    let clicked_id = $(caller).attr('id');
    for (let i = 0; i < in_polys.length; i++) {
        let temp_id = $(in_polys[i]).attr('id');
        if (temp_id !== clicked_id) {
            $(in_polys[i]).fadeToggle();
            $(in_texts[i]).fadeToggle();
        }
    }
}

function adjustSize() {
    let per_width = '40%';
    let margin_left = '5%';
    $("#map_container").css('width', per_width);
    $("#map_container").css('margin-left', margin_left);
}

function mapColor() {
    let colore, t, n_multe, n_tot = 0,
        tot = 0;
    for (let i = 0; i < quartieri.length; i++) {
        n_tot = n_tot + quartieri[i]["numeroInfrazioni"];
    }
    for (let i = 0; i < quartieri.length; i++) {
        nome = getIdFromNomeQuartiere(quartieri[i].getNome());
        n_multe = quartieri[i]["numeroInfrazioni"];
        t = (1530 * n_multe) / n_tot;
        tot = decimalToHex(255 - t);
        colore = "#ff" + tot + "00";
        quartieri[i].setColore(colore);
    }

}

function decimalToHex(decimal) {
    var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var conv = "",
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

function colorQuartieri() {
    let poligono;
    let nome;
    let colore;
    for (let i = 0; i < quartieri.length; i++) {
        nome = getIdFromNomeQuartiere(quartieri[i].getNome());
        poligono = document.getElementById(nome);
        colore = quartieri[i].getColore();
        $(poligono).css('fill', colore);
    }
}

function isIn(quartiere_s) {
    for (let i = 0; i < selected.length; i++) {
        if (selected[i] === quartiere_s) {
            return true;
        }
    }
    return false;
}

function aggiungiTogliSelected(id_quartiere) {
    let new_array = [];
    if (isIn(id_quartiere)) {
        while (selected.length > 0) {
            let ele = selected.pop();
            if (ele !== id_quartiere) {
                new_array.push(ele);
            }
        }
        selected = new_array;
    } else {
        if (selected.length < 3) {
            selected.push(id_quartiere);
        } else {
            alert('You can confrontare massimo three quartieri')
        }

    }
    console.log(selected);
}

function set_page_event_listeners() {
    polys = $("polygon");
    texts = $(".text_map");
    svg = document.querySelector("svg");
    for (let i = 0; i < polys.length; i++) {
        /*Hover su Polygon*/
        polys[i].addEventListener("mouseover", function(e) { //hovering done right
            svg.appendChild(e.target);
            let idQuartiere = $(e.target).attr('id');
            let idText = '#' + idQuartiere + '_t';
            let text = $(idText);
            svg.appendChild(text[0]);
            $(polys[i]).css("fill", "yellow");
            $(polys[i]).css("stroke-width", "10px");
            $(texts[i]).css("font-size", "22pt");
        });
        polys[i].addEventListener("mouseleave", function(e) {
            for (let i = 0; i < polys.length; i++) {
                svg.appendChild(texts[i]);
            }
            colorQuartieri();
            if (!isIn($(polys[i]).attr('id'))) {
                $(texts[i]).css("font-size", "14pt");
                $(texts[i]).css("fill", "black");
            }
            $(polys[i]).css("stroke-width", "2px");
            $(polys[i]).css("stroke", "beige");
        });
        ///////////////////////////////////

        /*Hover su Text*/
        texts[i].addEventListener("mouseover", function(e) {
            let idText = $(texts[i]).attr('id');
            let lun = idText.length;
            let idQuartiere = idText.substr(0, lun - 2);
            let quart = $('#' + idQuartiere);
            svg.appendChild(quart[0]);
            svg.appendChild(texts[i]);
            for (let i = 0; i < polys.length; i++) {
                if (idQuartiere === $(polys[i]).attr('id')) {
                    $(polys[i]).css("stroke-width", "10px");
                    $(polys[i]).css("stroke", "beige");
                    $(polys[i]).css("fill", "yellow");
                    $(texts[i]).css("font-size", "22pt");
                    break;
                }
            }
        });
        texts[i].addEventListener("mouseleave", function(e) {
            for (let i = 0; i < polys.length; i++) {
                svg.appendChild(texts[i]);
            }
            let idQuartiere = $(texts[i]).attr('id');
            let lun = idQuartiere.length;
            colorQuartieri();
            idQuartiere = idQuartiere.substr(0, lun - 2);
            for (let i = 0; i < polys.length; i++) {
                if (idQuartiere === $(polys[i]).attr('id')) {
                    if (!isIn(idQuartiere)) {
                        $(texts[i]).css("font-size", "14pt");
                        $(texts[i]).css("fill", "black");
                    }
                    $(polys[i]).css("stroke-width", "2px");
                    $(polys[i]).css("stroke", "beige");
                    break;
                }
            }
        });
        ///////////////////////////////////
        $(polys[i]).click(function() {
            let idQuartiere = $(polys[i]).attr('id');
            let idText = idQuartiere + '_t';
            for (let i = 0; i < texts.length; i++) {
                if (idText === $(texts[i]).attr('id')) {
                    $(texts[i]).css("font-size", "22pt");
                    $(texts[i]).css("fill", "#03F500");
                    //#1a34dd
                    break;
                }
            }
            let plotDiv = $('#district_graph');
            aggiungiTogliSelected(this.id);
            if (!isIn(idQuartiere)) {
                $(texts[i]).css("fill", "black");
            }
            plotTimeSanction('turin_temp');
            plotTypeSanction('turin_type');

            plotDiv.show();
        });
        $(texts[i]).click(function() {
            let idText = $(texts[i]).attr('id');
            let lun = idText.length;
            let idQuartiere = idText.substr(0, lun - 2);
            $(texts[i]).css("font-size", "22pt");
            $(texts[i]).css("fill", "#03F500");
            //#1a34dd
            let plotDiv = $('#district_graph');
            let polyid = this.id.substring(0, this.id.length - 2);
            aggiungiTogliSelected(polyid);
            if (!isIn(idQuartiere)) {
                $(texts[i]).css("fill", "black");
            }
            plotTimeSanction('turin_temp');
            plotTypeSanction('turin_type');
            plotDiv.show();
        });
    }
}