let data;
let keys;
//commit prova Luca
class Quartiere{
    constructor(nome){
        this.nome = nome;
        this.CAP = [];
        this.rows = [];
        this.numeroInfrazioni = 0;
    }

    getNome(){ return this.nome}
    getCAP() { return this.CAP}
    addCAP (CAP) { this.CAP.push(CAP)}
    addRow(row){ this.rows.push(row); }
    getNumberRows() { return this.rows.length; }
    addInfrazione() { this.numeroInfrazioni++; }

}

let quartieri;
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
    new Quartiere('Centro'), //guarda bene CAP
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
quartieri[0].addCAP('10139'); // Cenisia Cit Turin
quartieri[1].addCAP('10141' ); //San Paolo
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
quartieri[10].addCAP('10151'); //Aurora
quartieri[10].addCAP('10152'); //Aurora
quartieri[11].addCAP('10132'); //Madonna del Pilone
quartieri[12].addCAP('10139'); //Pozzo Strada
quartieri[12].addCAP('10140'); //Pozzo Strada
quartieri[12].addCAP('10141'); //Pozzo Strada
quartieri[13].addCAP('10070'); //Centro
quartieri[14].addCAP('10124'); //Vanchiglia
quartieri[15].addCAP('10128'); //Crocetta
quartieri[15].addCAP('10129'); //Crocetta
quartieri[16].addCAP('10125'); //San Salvario
quartieri[16].addCAP('10126'); //San Salvario
quartieri[17].addCAP('10131'); //Cavoretto
quartieri[17].addCAP('10133'); //Cavoretto
quartieri[18].addCAP('10135'); // Mirafiori Nord
quartieri[18].addCAP('10136'); // Mirafiori Nord
quartieri[18].addCAP('10137'); // Mirafiori Nord
quartieri[19].addCAP('10136'); //Santa Rita
quartieri[19].addCAP('10137'); //Santa Rita
quartieri[20].addCAP('10126'); //Lingotto
quartieri[21].addCAP('10127'); //Nizza
quartieri[22].addCAP('10135'); //Mirafiori Sud


function appendHTML(id, html){
    let el = document.getElementById(id);
    el.innerHTML = el.innerHTML + html;
}

function writeRow(index){
    let row = '<tr>';
    for (let i = 0; i < keys.length; i++){
        row += '<td>' + data[index][keys[i]] + '</td>';
    }
    row += '</tr>';
    return row;
}

function writeHeader(){
    let row = '<tr>';
    for (let i = 0; i < keys.length; i++){
        row += '<th>' + keys[i] + '</th>';
    }
    row += '</tr>';
    return row;
}
/* READING FUNCTION AND ASYNCHRONOUS REQUEST */
///////////////////////////////////////////////
function readAsync(){
    loadASync('data_full.json', json =>{
        data = JSON.parse(json);
        let item = data[0];
        keys = Object.keys(item);
        let row = writeHeader();

        for (let i = 0; i < data.length; i++){
            row += writeRow(i);
        }
        appendHTML('content', row);
        // PlotTypeSanction(data);
        // PlotTimeSanction(data);
        // PlotTypeReport(data);
    });
}

function loadASync(url,success){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4)
            if(okStatus(xhr.status)){
                success(xhr.responseText);
            }else{
                console.error("Request failed : " + url);
            }
    };
    xhr.send();
}

function okStatus(s){
    return [200,304].indexOf(s) >= 0;
}
///////////////////////////////////////////////

function PlotTypeSanction(data,div,quartiere){

    let administrative=0;
    let tributary=0;

    if(div===undefined)
    {
        console.log("manca il div");
        return;
    }
    if(quartiere===undefined)
    {
        for (let i = 0; i < data.length; i++){
        if(data[i]["Tipo Sanzione"]=="Amministrativa")
                administrative++;

        if(data[i]["Tipo Sanzione"]=="Tributaria")
                tributary++;
        }
    }
    else
    {
        for (let i = 0; i < data.length; i++){
        if((data[i]["Tipo Sanzione"]=="Amministrativa")&&(data[i]["Quartiere"]==quartiere))
            administrative++;

        if((data[i]["Tipo Sanzione"]=="Tributaria")&&(data[i]["Quartiere"]==quartiere))
            tributary++;
        }
    }
    var value=[{ values:[administrative,tributary],
                 labels:['Amministrativa','Tributaria'],
                  type : 'pie' }];
    var layout={height: 300,
                 width: 300};

    //  console.log(administrative);
  //  console.log(tributary);

    Plotly.newPlot(div,value,layout);
}

function PlotTimeSanction(data,div,quartiere) {

    let  months= new Array();
    let j,i,m,g;

    if(div===undefined)
    {
        console.log("manca il div");
        return;
    }

    for(j=0;j<12;j++)
    {
        months[j]= new Array();
        for(i=0;i<31;i++)
            months[j][i]=0;
    }

    if(quartiere===undefined)
    {
        for(i=0;i<data.length;i++)
        {
        m=data[i]["Mese Accertamento"]-1;
        g=data[i]["Giorno Accertamento"]-1;
        months[m][g]++;
        }
    }
    else
    {
        for(i=0;i<data.length;i++)
        {
        if(data[i]["Quartiere"]==quartiere)
        {
        m=data[i]["Mese Accertamento"]-1;
        g=data[i]["Giorno Accertamento"]-1;
        months[m][g]++;
        }
        }
    }
    var trace={};
    var layout={};
  //  console.log(months);

    Plotly.plot(div,trace,layout);
}

function PlotTypeReport(data)
{
    let i,uffici=0,questura=0,polizia=0,ministero=0,arpa=0,finanza=0,asl=0,carabinieri=0,citt_torino=0;

    for(i=0;i<data.length;i++)
    {
        if(data[i]["Tipologia Verbale"]=="POLIZIA MUNICIPALE")
            polizia++;

        if(data[i]["Tipologia Verbale"]=="QUESTURA")
            questura++;

        if(data[i]["Tipologia Verbale"]=="GUARDIA DI FINANZA")
            finanza++;

        if(data[i]["Tipologia Verbale"]=="CARABINIERI")
            carabinieri++;

        if(data[i]["Tipologia Verbale"]=="UFF. LAVORI PUBBLICI")
            uffici++;

        if(data[i]["Tipologia Verbale"]=="A.S.L.")
            asl++;

        if(data[i]["Tipologia Verbale"]=="A.R.P.A.")
            arpa++;

        if(data[i]["Tipologia Verbale"]=="MIN. INTERNO")
            ministero++;

        if(data[i]["Tipologia Verbale"]=="CITTA METROP.TORINO")
            citt_torino++;
    }

    console.log(asl)
    //plot
}

