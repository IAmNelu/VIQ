let data;
let keys;

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
        //PlotTypeSanction("qui","San Paolo");
        //PlotTimeSanction("qui");
       // MapColor();

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

function PlotTypeSanction(div,quartiere){

    let administrative=0;
    let tributary=0;
    let multe=[];
    let i=0;

    if(div===undefined)
    {
        console.log("manca il div");
        return;
    }

    if(quartiere===undefined)
    {
        //tutta torino
        quartiere="Torino";
        for (i = 0; i < quartieri.length; i++){
           multe =multe.concat(quartieri[i]["reati"]);
        }
    }
    else
    {
        for (let i = 0; i < quartieri.length; i++){
           if(quartieri[i].getNome()==quartiere)
           {
            multe=multe.concat(quartieri[i]["reati"]);
           }
        }
    }
    for(i=0;i<multe.length;i++)
    {
        if((multe[i]["Tipo Sanzione"]=="Amministrativa"))
            administrative+=parseInt(multe[i]["Numero Verbali"]);

        if((multe[i]["Tipo Sanzione"]=="Tributaria"))
            tributary+=parseInt(multe[i]["Numero Verbali"]);
    }

    var value=[{ values:[administrative,tributary],
                 labels:['Amministrativa','Tributaria'],
                 type : 'pie',
                 name: quartiere,
                 marker: { colors: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)'] },}];
    var layout={height: 500,
                 width: 500};

    Plotly.newPlot(div,value,layout);
}

function PlotTimeSanction(div,quartiere) {

    let  months = [];
    let multe=[];
    let j,i,m,g,tot;


    if(div===undefined)
    {
        console.log("manca il div");
        return;
    }

    for(j=0;j<12;j++)
    {
        months[j]=[];
        for(i=0;i<31;i++)
            months[j][i]=0;
    }

    if(quartiere===undefined)
    {
        //tutta torino
        quartiere="Torino";
        for (i = 0; i < quartieri.length; i++){
            multe =multe.concat(quartieri[i]["reati"]);
        }
    }
    else
    {
        for ( i = 0; i < quartieri.length; i++){
        if(quartieri[i].getNome()==quartiere)
        {
            multe=multe.concat(quartieri[i]["reati"]);
        }
    }
    }
    for(i=0;i<multe.length;i++)
    {
        m=multe[i]["Mese Accertamento"]-1;
        g=multe[i]["Giorno Accertamento"]-1;
        months[m][g] += parseInt(multe[i]["Numero Verbali"]);
    }

    var value={ x:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
                y:[],
                type:'bar',
                orientation:"v",
                marker: { color: "DodgerBlue",}};
    var layout={title:"Anno: 2017",
                margin: {l: 45, r:20, b: 50, t:60},
                width:500,
                height:400,
                xaxis: { title: "Mese"},
               yaxis: { title: "N° Infrazioni"}
    };

    for(m=0;m<12;m++)
    {
        tot=0;
        for(g=0;g<31;g++)
        {
            tot=tot+months[m][g];
        }
        value.y.push(tot);
    }

    Plotly.newPlot(div,[value],layout);
}

function MapColor(){

    let colore,t,i,nome,mappa,n_multe,n_tot=0;

    for(i=0;i<quartieri.length;i++)
    {
        n_tot = n_tot + quartieri[i]["numeroInfrazioni"];
    }

    for(i=0;i<quartieri.length;i++)
    {
        nome=quartieri[i].getNome();
        mappa=document.getElementById(nome);
        n_multe=quartieri[i]["numeroInfrazioni"];
        t=(10*n_multe)/n_tot;
        colore="#ffffff";
        console.log(t);
      //  mappa.setAttribute("style","fill:colore");
        $(mappa).fill('color','red');
    }

}