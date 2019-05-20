let v = document.getElementById("hello");
v.innerHTML = "Yeah";

function readFileR(e) {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
}

function displayContents(contents) {
    let element = document.getElementById('file-content');
    element.textContent = contents;
}

document.getElementById('file-input')
    .addEventListener('change', readFileR, false);

function readAsync(){
    loadASync('./PythonScripts/result.json', json =>{
        let data = JSON.parse(json);
        console.log(data[5308]["Via 1"]);
        console.log(data)
    });
}

function loadASync(url,success){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4)
            if(okStatus(xhr.status)){
                success(xhr.responseText);
                console.log("Qui");
            }else{
                console.error("Request failed : " + url);
            }
    };
    xhr.send();
}

function okStatus(s){
    return [200,304].indexOf(s) >= 0;
}

function readFile(fileCSV){
    let rows = fileCSV.split(/[\n\r]/);
    let fields = rows[0].split(";");
    let values = {
        headers : [],
        data : []
    };
    values.headers = fields;
    for(let i =1; i<rows.length;++i){
     let row =[];
     let cells = rows[i].split(";");
     for(let j = 0; j<fields.length; ++j){
         row[j] = cells[j];
     }
     values.data.push(row);
    }
    return values;
}

