let data;
let keys;

/* READING FUNCTION AND ASYNCHRONOUS REQUEST */
///////////////////////////////////////////////
function readAsync(){
    loadASync('data_full.json', json =>{
        data = JSON.parse(json);
        let item = data[0];
        keys = Object.keys(item);
        //--------------> funzione consumer
        //PlotTypeSanction("qui","San Paolo");
        //PlotTimeSanction("qui");
        //mapColor();

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



