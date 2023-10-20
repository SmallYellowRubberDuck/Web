const table = document.getElementById("table-result")

function addToTable(x, y, r, result, execAt, execTime) {
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
    res_cell.innerHTML = result;
    execAt_cell.innerHTML = execAt;
    execTime_cell.innerHTML = execTime;
}
function clear_table(){
    localStorage.removeItem("table")
    location.reload();
}