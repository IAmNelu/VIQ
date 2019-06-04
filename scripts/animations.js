let polys = [];
let texts = [];
$( document ).ready(function() {
    //mapColor(); // to debug 
    adjustSize(); // to remove
    polys = $("polygon");
    texts = $("text");
    for (let i = 0; i < polys.length; i++){
        $(polys[i]).mouseover(function () {
            $( this ).css("fill", "yellow");
        }).mouseleave(function () {
            $( this ).css("fill", "dodgerblue");
        });
        $(texts[i]).mouseover(function () {
            $( this ).prev().css("fill", "yellow");
        }).mouseleave(function () {
            $( this ).prev().css("fill", "dodgerblue");
        });
        $(polys[i]).click(function () {
            sparisciQuartiere($(this));
        });
        $(texts[i]).click(function () {
            let id = $(this).prev();
            sparisciQuartiere(id);
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
    let h_doc = $(document).height();
    let scale = h_doc/ $("#map_container").height();
    let desir_w = $("#map_container").width()*scale;
    alert("Doc: " + h_doc + " - Obj: " + $("#map_container").height());
    $("#map_container").width(desir_w);
    $("#map_container").height(h_doc);

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
        mappa=document.getElementById(nome);
        n_multe=quartieri[i]["numeroInfrazioni"];
        t=(10*n_multe)/n_tot;
        colore="#ffffff";
        console.log(t);
      //  mappa.setAttribute("style","fill:colore");
        $(mappa).fill('color','red');
    }

}
