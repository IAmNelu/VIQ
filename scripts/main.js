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

