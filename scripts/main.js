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
       // PlotTypeSanction(data,"qui");
       // PlotTimeSanction(data,"qui");

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
                 type : 'pie',
                 name: 'Starry Night',
                 marker: { colors: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)'] },}];
    var layout={height: 500,
                 width: 500};

    Plotly.newPlot(div,value,layout);
}

function PlotTimeSanction(data,div,quartiere) {

    let  months = [];
    let j,i,m,g,tot;

    console.log(data);
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
        console.log("quartiere non definito");
        for(i=0;i<data.length;i++)
        {
        m=data[i]["Mese Accertamento"]-1;
        g=data[i]["Giorno Accertamento"]-1;
        months[m][g] += parseInt(data[i]["Numero Verbali"]);
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
        months[m][g] += parseInt(data[i]["Numero Verbali"]);
        }
        }
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


