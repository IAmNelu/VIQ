let polys = [];
let texts = [];
$( document ).ready(function() {
    $("svg").width(
        $("svg").width()*0.95
    );

    $("svg").height(
        $("svg").height()*0.95
    );
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
