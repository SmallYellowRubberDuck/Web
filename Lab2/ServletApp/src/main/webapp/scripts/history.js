const table = document.getElementById("table-result")
let myHistory;
let points = [];


function addToTable(x, y, r, result) {
    let row = table.insertRow(1);
    let x_cell = row.insertCell(0);
    let y_cell = row.insertCell(1);
    let r_cell = row.insertCell(2);
    let res_cell = row.insertCell(3);

    x_cell.innerHTML = x;
    y_cell.innerHTML = y;
    r_cell.innerHTML = r;
    if (result === true){
        res_cell.innerHTML = "Hit";
    }else res_cell.innerHTML = "Miss";
}
function addToFullTable(x, y, r, result, execAt, execTime) {
    let row = table.insertRow(1);
    let x_cell = row.insertCell(0);
    let y_cell = row.insertCell(1);
    let r_cell = row.insertCell(2);
    let res_cell = row.insertCell(3);
    let execAt_cell = row.insertCell(4);
    let execTime_cell = row.insertCell(5);

    x_cell.innerHTML = x;
    y_cell.innerHTML = y;
    r_cell.innerHTML = r;
    if (result === true){
        res_cell.innerHTML = "Hit";
    }else res_cell.innerHTML = "Miss";
    execAt_cell.innerHTML = execAt;
    execTime_cell.innerHTML = execTime;
}
async function clear_table(){
    const path = "./controller?";
    const data = new URLSearchParams();
    data.append("type", "delete");
    try {
        const response = await fetch(path+data.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        console.log(response);

        if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    }

    catch (error) {
    }
    location.reload();
}