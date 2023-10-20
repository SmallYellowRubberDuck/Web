const form = document.querySelector("form");
let x = -100;
const x_select = document.getElementById("x-select");
const y_select  = document.getElementById("y-select");
const r_select = document.getElementById("r-select");
const y_error = document.getElementById("yError");
const r_cells = document.querySelectorAll('input[name="r-select"]');
const allError = document.getElementById("allError");
        
drawShapesByR(1); 
function setX(newx){
    x = ""+newx;
}
function newR(newR){
    drawShapesByR(newR);
    for (const f of r_cells) {
        if (f.checked) {
          r = f.value;
        }
      }
}
newR(1);
form.addEventListener("submit", (event) => {
    const y = y_select.value;
    event.preventDefault();

    const isValidY = !Number.isNaN(y);
    const isAcceptableY = y >= -3 && y <= 5;
    if (x==-100){
        allError.textContent = "Maybe you forgot to choose X";
        allError.className = "error active";
    }
    if (!isValidY) {
        y_select.className = "invalid";
        y_error.textContent = "Expected number";
        y_error.className = "error active";
    } else if (!isAcceptableY) {
        y_select.className = "invalid";
        y_error.textContent = "Number should be between -3 and 5";
        y_error.className = "error active";
    } else {
        y_select.className = "valid";
    }

    if (isValidY&&(x!=-100)&&isAcceptableY) {
        y_error.textContent = "";
        y_error.className = "error";
        allError.textContent = "";
        allError.className = "error";
        drawPoint(x, y, r);
        isIntersects(x, y, r);
    }
});


//TODO Валидация на сервере от хитрожопых, (обработка запятой в десятичных), (история) 