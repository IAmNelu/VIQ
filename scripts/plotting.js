let quartiere=[];

function plotTimeSanction(div) {

    let  months = [];
    let multe=[];
    let j,i,m,g,tot,nome_s=[],nome_q;


    if(div===undefined)
    {
        console.log("manca il div");
        return;
    }

    var trace=[{x:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
                y:[],
                type:'scatter',
                name: "Torino"},
              {x:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
               y:[],
               type:'scatter',
               name:""},
              {x:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
               y:[],
               type:'scatter',
               name:""},
              {x:['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
               y:[],
               type:'scatter',
               name:""}];

    var layout={title:"Infrazioni Torino 2017",
        margin: {l: 45, r:20, b: 50, t:60},
        width:500,
        height:400,
        yaxis: { title: "N° Infrazioni"}};

        //tutta torino
        for (i = 0; i < quartieri.length; i++){
            multe =multe.concat(quartieri[i]["reati"]);
        }
        for(m=0;m<12;m++){
        months[m]=0;
        }

        for(i=0;i<multe.length;i++){
        m=multe[i]["Mese Accertamento"]-1;
        months[m] += parseInt(multe[i]["Numero Verbali"]);
        }
    for(m=0;m<12;m++){
        trace[0].y.push(months[m]);
    }

// i singoli quartieri

    for(j=0;j<quartiere.length;j++){
        //inizializzo i mesi
        for(m=0;m<12;m++)
        {
         months[m]=0;
        }
        nome_q="";
        nome_s=quartiere[j].split("_");

        if(nome_s.length==1){
            nome_q=nome_s[0];
        }
        if(nome_s.length==2){
            nome_q=nome_s[0]+" "+nome_s[1];
        }
        if(nome_s.length==3){
            nome_q=nome_s[0]+" "+nome_s[1]+" "+nome_s[2];
        }
        multe=[];
        for ( i = 0; i < quartieri.length; i++){
            if(quartieri[i].getNome()===nome_q)
            {
                multe=multe.concat(quartieri[i]["reati"]);
            }
        }
        //calcolo le multe per mese
        for(i=0;i<multe.length;i++){
            m=multe[i]["Mese Accertamento"]-1;
            months[m] += parseInt(multe[i]["Numero Verbali"]);
        }

        for(m=0;m<12;m++){
            trace[j+1].y.push(months[m]);
        }
        trace[j+1].name=nome_q;
    }


    Plotly.newPlot(div,trace,layout);
}

//to debug
function plotTypeSanction(div){

    let administrative=0;
    let tributary=0;
    let multe=[],data=[];
    let i,j,nome_q,tot;

    if(div===undefined)
    {
        console.log("manca il div");
        return;
    }

    //x = nomi quartieri
    //y1 = administrative
    //y2 = tributary
    var trace1=[{x:[],
                y:[],
                type : 'bar',
                marker: { colors: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)'] },}];

    var trace2=[{x:[],
                 y:[],
                 type : 'bar',
                 marker: { colors: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)'] },}];

    var layout={height: 500,
                width: 500,
                barmode: 'stack'};


    //tutta torino
    for (i = 0; i < quartieri.length; i++){
        multe =multe.concat(quartieri[i]["reati"]);
    }
    //calcolo
    for(i=0;i<multe.length;i++)
    {
        if((multe[i]["Tipo Sanzione"]=="Amministrativa"))
            administrative+=parseInt(multe[i]["Numero Verbali"]);

        if((multe[i]["Tipo Sanzione"]=="Tributaria"))
            tributary+=parseInt(multe[i]["Numero Verbali"]);
    }
    tot=tributary+administrative;
    tributary=(tributary*100)/tot;
    administrative=(administrative*100)/tot;

    trace1.x.push("Torino");
    trace2.x.push("Torino");
    trace1.y.push(administrative);
    trace2.y.push(tributary);

    for(j=0;j<quartiere.length;j++){
        multe="";
        nome_q="";
        nome_s=quartiere[j].split("_");

        if(nome_s.length==1){
            nome_q=nome_s[0];
        }
        if(nome_s.length==2){
            nome_q=nome_s[0]+" "+nome_s[1];
        }
        if(nome_s.length==3){
            nome_q=nome_s[0]+" "+nome_s[1]+" "+nome_s[2];
        }
        multe=[];
        for (let i = 0; i < quartieri.length; i++){
            if(quartieri[i].getNome()==nome_q){
                multe=multe.concat(quartieri[i]["reati"]);
            }
        }
        administrative=0;
        tributary=0;
        for(i=0;i<multe.length;i++)
        {
            if((multe[i]["Tipo Sanzione"]=="Amministrativa"))
                administrative+=parseInt(multe[i]["Numero Verbali"]);

            if((multe[i]["Tipo Sanzione"]=="Tributaria"))
                tributary+=parseInt(multe[i]["Numero Verbali"]);
        }
    tot=tributary+administrative;
    tributary=(tributary*100)/tot;
    administrative=(administrative*100)/tot;
    trace1.x.push(nome_q);
    trace2.x.push(nome_q);
    trace1.y.push(administrative);
    trace2.y.push(tributary);
    }


    data=[trace1,trace2];
    Plotly.newPlot(div,[data],layout);
}