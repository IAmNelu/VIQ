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

