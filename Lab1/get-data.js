function isIntersects(select_x, select_y, select_r) {
    const req = new XMLHttpRequest();
    const urlParams =
        new URLSearchParams({"x-select": select_x, "y-select": select_y, "r-select": select_r});
        console.log(urlParams.toString());
    req.open("GET",
        "./check.php?" + urlParams.toString(),
        true);
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            if (req.status === 200 || req.status === 400) {
                const values = req.responseText.split(';');
                let value = localStorage.getItem("table");
                value += "~~~" + req.responseText;
                localStorage.setItem("table",value);
                addToTable(values[0], values[1], values[2], values[3], values[4], values[5]);
                window.open("./table.html");
            } else {
                console.error("Error:" + req.statusText + " " + req.readyState + "\n");
            }
        }
    };
    req.send(null);
}
window.addEventListener("load", () => {
    let storage_values = localStorage.getItem("table").split("~~~");
    if (storage_values!=null){
    storage_values.splice(0,1);
    storage_values.forEach(element => {
        let values = element.split(";");
        addToTable(values[0], values[1], values[2], values[3], values[4], values[5]);
    });}
});
