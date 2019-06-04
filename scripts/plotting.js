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