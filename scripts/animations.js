let polys = [];
let texts = [];
let selected = [];

$(document).ready(function() {

    set_page_event_listeners();

    window.onresize = function() {
        //aggiusta valori layout solo su dispositivi non mobile
        if (window.matchMedia("(orientation: landscape)").matches) {
            setta_responsivita();
        }
    };

});

//Per controllare se un dato quartiere è tra quelli già selezionati (click fatto sopra)
function isIn(quartiere_s) {
    for (let i = 0; i < selected.length; i++) {
        if (selected[i] === quartiere_s) {
            return true;
        }
    }
    return false;
}

// Permette di togliere o aggiungere un quartiere al vettore di quartieri selezionati.
function aggiungiTogliSelected(id_quartiere) {
    let new_array = [];
    if (isIn(id_quartiere)) {
        while (selected.length > 0) {
            let ele = selected.pop();
            if (ele !== id_quartiere) {
                // Devo toglierlo solo se è il quartiere cliccato.
                new_array.push(ele);
            }
        }
        selected = new_array;
    } else {
        if (selected.length < 3) {
            selected.push(id_quartiere);
        }
        // Alert se seleziono più di 3 quartieri.
        else {
            alert('Puoi confrontare al massimo tre quartieri per volta.')
        }

    }
}

// Definisco le animazioni sulla mappa di Torino.
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
            $(polys[i]).css("fill", "lightblue");
            $(polys[i]).css("stroke-width", "10px");
            $(texts[i]).css("font-size", "22pt");
        });
        /*Mouse leave the polygon*/
        polys[i].addEventListener("mouseleave", function(e) {
            for (let i = 0; i < polys.length; i++) {
                svg.appendChild(texts[i]);
            }
            colorQuartieri();
            //La scritta dei quartieri selezionati rimane uguale
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
                    $(polys[i]).css("fill", "lightblue");
                    $(texts[i]).css("font-size", "22pt");
                    break;
                }
            }
        });
        /*Mouse leave the text*/
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
                    //La scritta dei quartieri selezionati rimane uguale
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
        /* Click sui poligoni */
        $(polys[i]).click(function() {
            let values = getLayoutValues();
            let idQuartiere = $(polys[i]).attr('id');
            let idText = idQuartiere + '_t';
            for (let i = 0; i < texts.length; i++) {
                if (idText === $(texts[i]).attr('id')) {
                    $(texts[i]).css("font-size", "22pt");
                    $(texts[i]).css("fill", "#ffffff");
                    $(texts[i]).css("text-shadow", " -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black");
                    break;
                }
            }
            let plotDiv = $('#district_graph');
            aggiungiTogliSelected(this.id);
            if (!isIn(idQuartiere)) {
                $(texts[i]).css("fill", "black");
                $(texts[i]).css("text-shadow", " none");
            }
            // Chiamo funzioni di Plotting.
            plotTimeSanction('turin_temp', values['width_g'], values['height_g']);
            plotTypeSanction('turin_type', values['width_g'], values['height_g']);
            plotDiv.show();
        });
        /* Click sui testi */
        $(texts[i]).click(function() {
            let values = getLayoutValues();
            let idText = $(texts[i]).attr('id');
            let lun = idText.length;
            let idQuartiere = idText.substr(0, lun - 2);
            $(texts[i]).css("font-size", "22pt");
            $(texts[i]).css("fill", "#ffffff");
            $(texts[i]).css("text-shadow", " -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black");
            let plotDiv = $('#district_graph');
            let polyid = this.id.substring(0, this.id.length - 2);
            aggiungiTogliSelected(polyid);
            if (!isIn(idQuartiere)) {
                $(texts[i]).css("fill", "black");
                $(texts[i]).css("text-shadow", " none");
            }
            // Chiamo funzioni di Plotting.
            plotTimeSanction('turin_temp', values['width_g'], values['height_g']);
            plotTypeSanction('turin_type', values['width_g'], values['height_g']);
            plotDiv.show();
        });
    }
}