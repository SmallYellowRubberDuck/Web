// window.addEventListener("load", () => {
//     let storage_values = localStorage.getItem("table").split("~~~");
//     if (storage_values!=null){
//         storage_values.splice(0,1);
//         storage_values.forEach(element => {
//             let values = element.split(";");
//             addToTable(values[0], values[1], values[2], values[3], values[4], values[5]);
//         });}
// });

let serverError = document.getElementById("server-error");
window.addEventListener("load", () => {

    const savedX = JSON.parse(localStorage.getItem("x")) || "";
    const savedY = JSON.parse(localStorage.getItem("y")) || "";
    const savedR = JSON.parse(localStorage.getItem("r")) || "";

    if (savedR !== ""){
        document.getElementById("r-select").options[ localStorage['r'] ].selected = true;
        newR(document.getElementById("r-select").options[ localStorage['r'] ].value);
    }else {
        newR(1);
    }

    if (savedY !== ""){
        y_cells[savedY].checked=true;
        newY(y_cells[savedY].value);
    }else{
        newY(0);
    }

    if (savedX !== ""){
        x_select.value = savedX;
    }

});