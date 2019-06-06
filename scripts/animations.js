let polys = [];
let texts = [];
$( document ).ready(function() {
    //mapColor(); // to debug 
    //adjustSize(); // to remove
    polys = $("polygon");
    texts = $("text");
    svg = document.querySelector("svg");
    for (let i = 0; i < polys.length; i++){
        /*Hover su Polygon*/
        polys[i].addEventListener("mouseover", function(e) { //hovering done right
            svg.appendChild(e.target);
            let idQuartiere =  $( e.target ).attr('id');
            let idText = '#' + idQuartiere + '_t';
            let text = $(idText);
            svg.appendChild(text[0]);
            $(polys[i]).css("fill", "yellow");
            $(polys[i]).css("stroke-width", "10px");
        });
        polys[i].addEventListener("mouseleave", function(e) {
            for (let i = 0; i < polys.length; i++) {
                svg.appendChild(texts[i]);
            }
            $(polys[i]).css("fill", "dodgerblue");
            $(polys[i]).css("stroke-width", "2px");
        });
        ///////////////////////////////////

        /*Hover su Text*/
        texts[i].addEventListener("mouseover", function(e) {
            let idText =  $(texts[i]).attr('id');
            let lun = idText.length;
            let idQuartiere = idText.substr(0,lun-2);
            let quart =  $('#' + idQuartiere);
            svg.appendChild(quart[0]);
            svg.appendChild(texts[i]);
            for(let i = 0; i < polys.length; i++) {
                if (idQuartiere === $(polys[i]).attr('id')) {
                    $(polys[i]).css("stroke-width", "10px");
                    $(polys[i]).css("fill", "yellow");
                    break;
                }
            }
        });
        texts[i].addEventListener("mouseleave", function(e) {
            for (let i = 0; i < polys.length; i++) {
                svg.appendChild(texts[i]);
            }
            let idQuartiere =  $(texts[i]).attr('id');
            let lun = idQuartiere.length;
            idQuartiere = idQuartiere.substr(0,lun-2);
            for(let i = 0; i < polys.length; i++){
                if(idQuartiere === $(polys[i]).attr('id')){
                    $(polys[i]).css("stroke-width", "2px");
                    $(polys[i]).css("fill", "dodgerblue")
                    break;
                }
            }
        })
        ///////////////////////////////////

        $(polys[i]).click(function () {
           // sparisciQuartiere($(this));
            let plotDiv = $('#district_graph');
            plotDiv.show();
        });
        $(texts[i]).click(function () {
            //let id = $(this).prev();
            //sparisciQuartiere(id);
            let plotDiv = $('#district_graph');
            plotDiv.show();
        });
    }

});

function sparisciQuartiere(caller){

    let in_polys = $("polygon");
    let in_texts = $("text");
    let clicked_id = $(caller).attr('id');
    for(let i = 0; i < in_polys.length; i++){
        let temp_id = $(in_polys[i]).attr('id');
        if(temp_id !== clicked_id){
            $(in_polys[i]).fadeToggle();
            $(in_texts[i]).fadeToggle();
        }
    }
}

function adjustSize(){
    let per_width = '40%';
    let margin_left = '5%';
    $("#map_container").css('width', per_width);
    $("#map_container").css('margin-left', margin_left);
}

function mapColor(){
    let colore,t,i,nome,mappa,n_multe,n_tot=0,nome_s=[],tot=0;

    for(i=0;i<quartieri.length;i++)
    {
        n_tot = n_tot + quartieri[i]["numeroInfrazioni"];
    }

    for(i=0;i<quartieri.length;i++)
    {
        nome=quartieri[i].getNome();
        nome_s=nome.split(" ");

        if(nome_s.length==1){
            nome=nome_s;
        }
        if(nome_s.length==2){
            nome=nome_s[0]+"_"+nome_s[1];
        }
        if(nome_s.length==3){
            nome=nome_s[0]+"_"+nome_s[1]+"_"+nome_s[2];
        }

        mappa=document.getElementById(nome);
        n_multe=quartieri[i]["numeroInfrazioni"];
        t=(765*n_multe)/n_tot;
        tot=decimalToHex(127-t);
        console.log("quartiere= "+nome);
        console.log("t= "+t);
        colore="#ff"+tot+"00";
        $(mappa).css('fill',colore);
    }

}

function decimalToHex(decimal) {
    var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var conv="",r1,r2,ris;
    decimal=Math.floor(decimal);
    if(decimal<16){
        conv="0"+hex[decimal];
    }
    else{
        r1=Math.floor(decimal%16);
        ris=Math.floor(decimal/16);
        r2=Math.floor(ris%16);
        conv=hex[r2]+hex[r1];
    }

    return conv;
}



function adjustZIndexing(){
    texts.forEach(element => {
        $(element).zIndex(5);
    });
    
}
