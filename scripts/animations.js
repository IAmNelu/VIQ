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
        });
        polys[i].addEventListener("mouseleave", function(e) {
            for (let i = 0; i < polys.length; i++) {
                svg.appendChild(texts[i]);
            }
        })
        $(polys[i]).mouseover(function () {
            $( this ).css("fill", "yellow");
            $( this).css("stroke-width", "10px");
        }).mouseleave(function () {
            $( this ).css("fill", "dodgerblue");
            $( this).css("stroke-width", "2px");
        });

        ///////////////////////////////////
        /*Hover su Text*/
        texts[i].addEventListener("mouseover", function(e) {
            let idText =  $( e.target ).attr('id');
            let lun = idText.length;
            let idQuartiere = '#' + idText.substr(0,lun-2);
            let quart =  $(idQuartiere); //DA PROBLEMI SU ALCUNI QUARTIERI E SOLO ALCUNE VOLTE, NON RIESCE A LEGGERE LA LUNGHEZZA DI idText
            svg.appendChild(quart[0]);
            svg.appendChild(e.target);
        })
        texts[i].addEventListener("mouseleave", function(e) {
            for (let i = 0; i < polys.length; i++) {
                svg.appendChild(texts[i]);
            }
        })
        $(texts[i]).mouseover(function () {
            let idQuartiere =  $( this ).attr('id');
            let lun = idQuartiere.length;
            idQuartiere = idQuartiere.substr(0,lun-2);
            for(let i = 0; i < polys.length; i++){
               if(idQuartiere === $(polys[i]).attr('id')){
                   $(polys[i]).css("stroke-width", "10px");
                   $(polys[i]).css("fill", "yellow");
                   break;
               }
           }
        }).mouseleave(function () {
            let idQuartiere =  $( this ).attr('id');
            let lun = idQuartiere.length;
            idQuartiere = idQuartiere.substr(0,lun-2);
            for(let i = 0; i < polys.length; i++){
                if(idQuartiere === $(polys[i]).attr('id')){
                    $(polys[i]).css("stroke-width", "2px");
                    $(polys[i]).css("fill", "dodgerblue")
                    break;
                }
            }
        });
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
    let colore,t,i,nome,mappa,n_multe,n_tot=0;
    for(i=0;i<quartieri.length;i++)
    {
        n_tot = n_tot + quartieri[i]["numeroInfrazioni"];
    }

    for(i=0;i<quartieri.length;i++)
    {
        nome=quartieri[i].getNome();
        mappa=document.getElementById("Barriera_di_Milano");
        n_multe=quartieri[i]["numeroInfrazioni"];
        t=(10*n_multe)/n_tot;
        colore="#ffffff";
        console.log(t);
      //  mappa.setAttribute("style","fill:colore");
        $(mappa).css('fill','colore');
    }

}


function adjustZIndexing(){
    texts.forEach(element => {
        $(element).zIndex(5);
    });
    
}
