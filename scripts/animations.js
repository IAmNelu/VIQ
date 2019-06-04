let polys = [];
let texts = [];
$( document ).ready(function() {
    adjustSize();
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
    let scale = h_doc/ $("svg").height();
    let desir_w = $("svg").width()*scale;
    alert("Doc: " + h_doc + " - Obj: " + $("svg").height());
    $("svg").width(desir_w);
    $("svg").height(h_doc);

}