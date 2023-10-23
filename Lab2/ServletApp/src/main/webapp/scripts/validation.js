const form = document.querySelector("form");
const x_select = document.getElementById("x-select");
const y_select  = document.getElementById("y-select");
const r_select = document.getElementById("r-select");
const x_error = document.getElementById("xError");
const r_cells = document.querySelectorAll('input[name="r-select"]');
const y_cells = document.querySelectorAll('input[name="y-select"]');
const allError = document.getElementById("allError");
const graph = document.getElementById("graph")

function newR(newR){
    drawShapesByR(newR);
    let pos;
    r = newR;
    pos = (Number(newR)-1)*2
    localStorage.setItem("r",String(pos));
    for (const dot of points){
        if (dot[2]===parseFloat(newR)) {
            drawPoint(dot[0], dot[1], dot[2]);
        }
    }
}
function newY(newY){
    let pos;
    for (const f of y_cells) {
        if (f.checked) {
            y = f.value;
            pos = Number(f.value) + 4;
        }
    }
    localStorage.setItem("y",String(pos));
}
r_select.addEventListener("change", function (e){
    newR(e.target.value);
});
form.addEventListener("submit", (event) => {
    const x = x_select.value;
    event.preventDefault();

    const isValidX = !Number.isNaN(x);
    const isAcceptableX = x >= -3 && x <= 5;
    if (!isValidX) {
        x_select.className = "invalid";
        x_error.textContent = "Expected number";
        x_error.className = "error active";
    } else if (!isAcceptableX) {
        x_select.className = "invalid";
        x_error.textContent = "Number should be between -3 and 5";
        x_error.className = "error active";
    } else {
        x_select.className = "valid";
    }

    if (isValidX&&isAcceptableX) {
        x_error.textContent = "";
        x_error.className = "error";
        allError.textContent = "";
        allError.className = "error";
        // drawPoint(x, y, r);
        sendValues(parseFloat(x), parseFloat(y), parseFloat(r), "input");
    }
});

canvas.addEventListener("click",function (event){
    const relativeY = event.clientY - graph.getBoundingClientRect().top;
    const relativeX = event.clientX - graph.getBoundingClientRect().left;
    let xy = canvasToAxesCoordinates(relativeX, relativeY, canvas);
    let x_click = xy["x"];
    let y_click = xy["y"];
    sendValues(parseFloat(x_click), parseFloat(y_click), parseFloat(r), "click");
});