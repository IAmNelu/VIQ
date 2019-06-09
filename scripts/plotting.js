function plotTimeSanction(div,span) {

    let months = [];
    let multe = [];
    let j, i, m, nome_s = [],
        nome_q,L;

    if (div === undefined) {
        console.log("manca il div");
        return;
    }

    var trace = [{
            x: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            y: [],
            type: 'scatter',
            name: "Torino",
            marker: {color: 'rgb(215, 25, 28)'}},
        {
            x: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            y: [],
            type: 'scatter',
            name: "",
            marker: {color: 'rgb(253, 174, 97)'}},
        {
            x: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            y: [],
            type: 'scatter',
            name: "",
            marker: {color: 'rgb(166, 217, 106)'}},
        {
            x: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
            y: [],
            type: 'scatter',
            name: "",
            marker: {color: 'rgb(26, 150, 65)'}}];

    if(span===0){
        L==600;
    }else{
        L=span;
    }
    var layout = {
        margin: {l:50,r:20,t:60,b:50},
        width: L,
        height: 380,
        showlegend: true,
        legend:{y:1, x:0.1,
            orientation:"h",
            yanchor:"bottom"},
            yaxis: {title:"N° Infrazioni"}};

    //tutta torino

    if(selected.length===0){
        for (i = 0; i < quartieri.length; i++) {
            multe = multe.concat(quartieri[i]["reati"]);
        }
        for (m = 0; m < 12; m++) {
            months[m] = 0;
        }

        for (i = 0; i < multe.length; i++) {
            m = multe[i]["Mese Accertamento"] - 1;
            months[m] += parseInt(multe[i]["Numero Verbali"]);
        }
        for (m = 0; m < 12; m++) {
            trace[0].y.push(months[m]);
        }
    }

    // i singoli quartieri

    for (j = 0; j < selected.length; j++) {
        //inizializzo i mesi
        for (m = 0; m < 12; m++) {
            months[m] = 0;
        }
        nome_q = "";
        nome_s = selected[j].split("_");

        if (nome_s.length == 1) {
            nome_q = nome_s[0];
        }
        if (nome_s.length == 2) {
            nome_q = nome_s[0] + " " + nome_s[1];
        }
        if (nome_s.length == 3) {
            nome_q = nome_s[0] + " " + nome_s[1] + " " + nome_s[2];
        }

        multe = [];
        for (i = 0; i < quartieri.length; i++) {
            if (quartieri[i].getNome() === nome_q) {
                multe = multe.concat(quartieri[i]["reati"]);
            }
        }
        //calcolo le multe per mese
        for (i = 0; i < multe.length; i++) {
            m = multe[i]["Mese Accertamento"] - 1;
            months[m] += parseInt(multe[i]["Numero Verbali"]);
        }

        for (m = 0; m < 12; m++) {
            trace[j + 1].y.push(months[m]);
        }
        trace[j + 1].name = nome_q;
    }

    Plotly.newPlot(div, trace, layout);
}

function plotTypeSanction(div,span) {

    let administrative = 0;
    let tributary = 0;
    let multe = [],
        data = [];
    let i, j, nome_q, nome_s, tot,L;

    if (div === undefined) {
        console.log("manca il div");
        return;
    }

    //x = nomi quartieri
    //y1 = administrative
    //y2 = tributary
    var trace1 = {
        x: [],
        y: [],
        type: 'bar',
        name: "Amministrative",
        marker: { color: 'rgb(26, 150, 65)' }};


    var trace2 = {
        x: [],
        y: [],
        type: 'bar',
        name: "Tributarie",
        marker: { color: 'rgb(215, 25, 28)' }};

    if(span===0){
        L==600;
    }else{
        L=span;
    }
    var layout = {
        height: 280,
        width: L,
        margin : {t:20,b:100,r:10,l:40},
        barmode: 'stack'};

    if(selected.length===0) {
        //tutta torino
        for (i = 0; i < quartieri.length; i++) {
            multe = multe.concat(quartieri[i]["reati"]);
        }

        //calcolo
        for (i = 0; i < multe.length; i++) {
            if ((multe[i]["Tipo Sanzione"] == "Tributaria"))
                tributary += parseInt(multe[i]["Numero Verbali"]);

            if ((multe[i]["Tipo Sanzione"] == "Amministrativa"))
                administrative += parseInt(multe[i]["Numero Verbali"]);
        }

        tot = tributary + administrative;
        tributary = (tributary * 100) / tot;
        administrative = 100 - tributary;

        trace1.x.push("Torino");
        trace2.x.push("Torino");
        trace1.y.push(administrative);
        trace2.y.push(tributary);
    }
    for (j = 0; j < selected.length; j++) {
        multe = [];
        nome_q = "";
        nome_s = selected[j].split("_");

        if (nome_s.length == 1) {
            nome_q = nome_s[0];
        }
        if (nome_s.length == 2) {
            nome_q = nome_s[0] + " " + nome_s[1];
        }
        if (nome_s.length == 3) {
            nome_q = nome_s[0] + " " + nome_s[1] + " " + nome_s[2];
        }

        multe = [];
        for (let i = 0; i < quartieri.length; i++) {
            if (quartieri[i].getNome() == nome_q) {
                multe = multe.concat(quartieri[i]["reati"]);
            }
        }
        administrative = 0;
        tributary = 0;
        for (i = 0; i < multe.length; i++) {
            if ((multe[i]["Tipo Sanzione"] == "Tributaria"))
                tributary += parseInt(multe[i]["Numero Verbali"]);

            if ((multe[i]["Tipo Sanzione"] == "Amministrativa"))
                administrative += parseInt(multe[i]["Numero Verbali"]);
        }
        tot = tributary + administrative;
        tributary = (tributary * 100) / tot;
        administrative = 100 - tributary;

        trace1.x.push(nome_q);
        trace2.x.push(nome_q);
        trace1.y.push(administrative);
        trace2.y.push(tributary);
    }

    data = [trace1, trace2];
    Plotly.newPlot(div, data, layout);
}

function plotNeighborhoodSanction(div) {

    var nbh = [],
        number = [],
        j, i, temp,tot=0;

    if (div === undefined) {
        console.log("manca il div");
        return;
    }

    var trace = {
        x: [],
        y: [],
        type: 'bar',
        name: "Quartieri",
        showlegend: false,
        marker: { color:'rgb(103, 169, 207)' }};

    var trace2={x: [],
        y: [],
        type: 'scatter',
        name: "Media",
        marker: { color:'rgb(215, 25, 28)'}};

    var layout = { bargap: 0.05,
        yaxis: { range: [0, 1005],
            title:"N° Infrazioni"},
        legend:{y:0.43,x:0.9 }};

    for (i = 0; i < quartieri.length; i++) {
        nbh[i] = quartieri[i].getNome();
        number[i] = quartieri[i].getNumberInfrazioni();
        tot +=number[i];
    }
    tot=tot/nbh.length;
    for (i = 0; i < nbh.length; i++) {
        for (j = 0; j < nbh.length - 1; j++) {
            if (number[i] > number[j]) {
                temp = nbh[i];
                nbh[i] = nbh[j];
                nbh[j] = temp;

                temp = number[i];
                number[i] = number[j];
                number[j] = temp;
            }
        }

    }

    for (let i = 0; i < quartieri.length; i++) {
        trace.x.push(nbh[i]);
        trace2.x.push(nbh[i]);
        trace.y.push(number[i]);
        trace2.y.push(tot);
    }
    var data=[trace, trace2];
    Plotly.newPlot(div,data, layout);
}