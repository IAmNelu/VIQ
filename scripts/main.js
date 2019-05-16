let v = document.getElementById("hello");
v.innerHTML = "Yeah";

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

