/**
 *  Funzione che prende in ingresso il nome di un quartiere, quindi una stringa con spazi
 *  e la converte in un id utilizzato per individuare un poligono
 * @param {String} nome Nome del quartiere con spazi
 * @returns {String} L'id di un poligono
 */
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

/**
 * Prende in input un intero compreso tra 0 e 255 e lo converte in un valore decimale
 * Non è necessario convertire valori maggiori perchè la funzione riceverà come argomento
 * il valore decimale riferito a r di un colore rgb, quindi compreso tra 0 e 255
 * @param {Integer} decimal 
 * @returns {String} Resituisce il valore esadecimale sotto forma di stringa 
 */
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
/**
 * Manda una richiesta XMLHttpRequest tipo GET all'url specificato e in caso di successo chiama la
 * funzione succsess con argomento la risposta della richiesta fatta. In caso di errore, viene segnalato
 * sulla console di comando 
 * @param {String} url Relative path del file da cui leggere 
 * @param {Function} success Funzione che deve valutare se la connessione ha avuto successo
 */
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
/**
 * Valuta lo stato della risposta della richiesta HTTP, se ha il valore 200 o 304 ha avuto successo
 * @param {Integer} s Stato HTTP resonse
 * @returns {Boolean} vero se la richiesta HTTP ha avuto successo (stato 200 o 304)
 */
function okStatus(s) {
    return [200, 304].indexOf(s) >= 0;
}
///////////////////////////////////////////////

/**
 * Calcola i valori per il layout dei grafici
 * @returns {Object} Un oggetto con che ha come attributi i valori che verranno assegnati 
 * alle funzioni di plotting
 */
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
    // in base all'orientamento del device gli assegna come larghezza la largezza totale - 50 se in mod
    // portrait, (verticale) o il 45% della largezza massima - 50 se in modalità landscape (orizzontale)
    //  Se in modalità verticale l'altezza definita in precedenza viene divisa per 3
    if (window.matchMedia("(orientation: portrait)").matches) {
        width_g = width - 50;
        height_g = height / 3;
    } else if (window.matchMedia("(orientation: landscape)").matches) {
        if (width > 800) {
            width_g = width * 45 / 100;
        } else {
            width_g = width - 50;
        }
    }
    //vengono fatte ulteriori modifiche se lo schermo ha un altezza superiore a 800
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
/**
 * Funzione speculare a @function getIdFromNomeQuartiere()
 * La funzione converte l'id in un nome valido per il quartiere
 * @param {String} id id di un poligono
 * @returns {String} il nome del quartiere corrispondendte al id passato come argomento
 */
function getNomeQuartierfromId(id) {

    let nome_s, nome_q;
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