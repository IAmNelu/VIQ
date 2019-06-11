let data;
let keys;
let quartieri;
let lettura_fatta = false;


/*LETTURA data_full E POPOLAMENTO INFRAZIONI*/
/////////////////////////////////////////////
function readQuartieri() {
    loadASync('data_full.json', putData);
}

function putData(json) {
    let data = JSON.parse(json);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let CAPfile = data[i]["CAP"];
        for (let j = 0; j < quartieri.length; j++) {
            let Quartiere = quartieri[j];
            CAPquartiere = Quartiere.getCAP();
            if (CAPquartiere.includes(CAPfile)) {
                Quartiere.addReato(data[i]);
                Quartiere.addInfrazione(data[i]);
            }
        }
    }
    mapColor();

}

//////////////////////////////////////////////

/*Assegna ad ogni quartiere un CAP */
function setCAPs() {
    quartieri[0].addCAP('10138'); // Cenisia Cit Turin
    quartieri[0].addCAP('10139'); // Cenisia Cit Turin
    quartieri[1].addCAP('10141'); //San Paolo
    quartieri[2].addCAP('10156'); //Villaretto
    quartieri[3].addCAP('10147'); //Madonna di Campagna
    quartieri[3].addCAP('10148'); //Madonna di Campagna
    quartieri[3].addCAP('10149'); //Madonna di Campagna
    quartieri[4].addCAP('10147'); //Borgo Vittoria
    quartieri[4].addCAP('10148'); //Borgo Vittoria
    quartieri[5].addCAP('10154'); //Barriera di Milano
    quartieri[5].addCAP('10155'); //Barriera di Milano
    quartieri[6].addCAP('10154'); //Regio Parco Bertola
    quartieri[7].addCAP('10151'); //Vallette Lucento
    quartieri[8].addCAP('10146'); //Parella
    quartieri[9].addCAP('10144'); //San Donato Campidoglio
    quartieri[9].addCAP('10143'); //San Donato Campidoglio
    quartieri[9].addCAP('10145'); //San Donato Campidoglio
    quartieri[10].addCAP('10151'); //Aurora
    quartieri[10].addCAP('10152'); //Aurora
    quartieri[11].addCAP('10132'); //Madonna del Pilone
    quartieri[12].addCAP('10142'); //Pozzo Strada
    quartieri[12].addCAP('10139'); //Pozzo Strada
    quartieri[12].addCAP('10140'); //Pozzo Strada
    quartieri[12].addCAP('10141'); //Pozzo Strada
    quartieri[13].addCAP('10121'); //Centro
    quartieri[13].addCAP('10122'); //Centro
    quartieri[13].addCAP('10123'); //Centro
    quartieri[14].addCAP('10124'); //Vanchiglia
    quartieri[14].addCAP('10153'); //Vanchiglia
    quartieri[15].addCAP('10128'); //Crocetta
    quartieri[15].addCAP('10129'); //Crocetta
    quartieri[16].addCAP('10125'); //San Salvario
    quartieri[16].addCAP('10126'); //San Salvario
    quartieri[17].addCAP('10131'); //Cavoretto
    quartieri[17].addCAP('10133'); //Cavoretto
    quartieri[18].addCAP('10135'); // Mirafiori Nord
    quartieri[18].addCAP('10136'); // Mirafiori Nord
    quartieri[18].addCAP('10137'); // Mirafiori Nord
    quartieri[19].addCAP('10134'); //Santa Rita
    quartieri[19].addCAP('10136'); //Santa Rita
    quartieri[19].addCAP('10137'); //Santa Rita
    quartieri[20].addCAP('10126'); //Lingotto
    quartieri[21].addCAP('10127'); //Nizza
    quartieri[22].addCAP('10135'); //Mirafiori Sud
}



///////////////////////////////////////


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


function mapColor() {

    let colore,nome, t, n_multe, n_tot = 0,
        tot = 0;
    for (let i = 0; i < quartieri.length; i++) {
        n_tot = n_tot + quartieri[i]["numeroInfrazioni"];
    }
    for (let i = 0; i < quartieri.length; i++) {
        nome = getIdFromNomeQuartiere(quartieri[i].getNome());
        n_multe = quartieri[i]["numeroInfrazioni"];
        t = (2108 * n_multe) / n_tot;
        tot = decimalToHex(255 - t);
        colore = "#ff" + tot + "00";
        quartieri[i].setColore(colore);
    }
    colorQuartieri();
    setta_responsivita();

}

function setta_responsivita() {
    let values = getLayoutValues();

    plotTimeSanction('turin_temp', values['width_g'], values['height_g']);
    plotTypeSanction('turin_type', values['width_g'], values['height_g']);
    plotNeighborhoodSanction('turin_quartieri', values['width_all'], values['height_all']);

}

///////////////////////////////////////

/* SET UP QUARTIERI*/

quartieri = [
    new Quartiere('Cenisia Cit Turin'),
    new Quartiere('San Paolo'),
    new Quartiere('Villaretto Falchera Rebaudengo'),
    new Quartiere('Madonna di Campagna'),
    new Quartiere('Borgo Vittoria'),
    new Quartiere('Barriera di Milano'),
    new Quartiere('Regio Parco Bertola'),
    new Quartiere('Vallette Lucento'),
    new Quartiere('Parella'),
    new Quartiere('San Donato Campidoglio'),
    new Quartiere('Aurora'),
    new Quartiere('Madonna Del Pilone'),
    new Quartiere('Pozzo Strada'),
    new Quartiere('Centro'),
    new Quartiere('Vanchiglia'),
    new Quartiere('Crocetta'),
    new Quartiere('San Salvario'),
    new Quartiere('Cavoretto Borgo Po'),
    new Quartiere('Mirafiori Nord'),
    new Quartiere('Santa Rita'),
    new Quartiere('Lingotto'),
    new Quartiere('Nizza'),
    new Quartiere('Mirafiori Sud')
];


//////////////////////////////////////////////

setCAPs();

/////////////////////////////////////////////