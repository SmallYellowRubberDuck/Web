let table;
let points = [];
let overlay;
let graphic;
const radiusCircle = 3;
const rScale = 2.5;

const floatRegexString = "^-?\\d+\\.?\\d*$";
const floatRegex = new RegExp(floatRegexString);

let submitButton;
let xInput;
let yInput;
let rInput;

let yError;

document.addEventListener("DOMContentLoaded", function () {
    table = document.getElementById("history-table");
    overlay = document.getElementById("overlay");
    graphic = document.getElementById("graphic")
    graphic.addEventListener('click', function (event) {
        checkHitByClick(event);
    })
    parseTable();
    submitButton = document.getElementById("input-form:submit-button");
    xInput = document.getElementById("input-form:x-value");
    yInput = document.getElementById("input-form:y-value");
    rInput = document.getElementById("show-r-value")
    submitButton.addEventListener("click", function () {
        const x = xInput.querySelector('input[name="input-form:x-value"]:checked').value;
        const y = yInput.value;
        const r = rInput.textContent;
        addPoint(x, y, r);
    })

    yError = document.getElementById("y-error");
});


function parseTable(){
    let rows = table.getElementsByTagName("tr");
    let rValue = parseFloat(document.getElementById("show-r-value").textContent);
    for(let i = 0; i < rows.length; i++){
        let cells = rows[i].getElementsByTagName("td");

        let x = parseFloat(cells[0].textContent);
        let y = parseFloat(cells[1].textContent);

        let point = [x, y];
        if(isPointFitsGraphic(x, y, rValue)){
            drawPoint(x, y, rValue);
        }
        points.push(point);
    }
}


function getColor(xValue, yValue, rValue){
    const inSecondQuarter = (-rValue <= xValue && xValue <= 0) && (0 <= yValue && yValue <=rValue);
    const inThirdQuarter = (xValue <= 0) && (yValue <= 0) && (yValue >= -xValue - rValue/2);
    const inForthQuarter = (xValue >= 0) && (yValue <= 0) && (xValue*xValue + yValue*yValue <= rValue*rValue);
    if(inSecondQuarter || inThirdQuarter || inForthQuarter){
        return "green";
    }
    else {
        return "red";
    }
}


function resizeGraphic(r){
    cleanCircles();
    for (const point of points){
        if(isPointFitsGraphic(point[0], point[1], r)){
            drawPoint(point[0], point[1], r);
        }
    }
}

function isPointFitsGraphic(xValue, yValue, rValue){
    return (-1.25*rValue <= xValue && xValue <= 1.25*rValue) && (-1.25*rValue <= yValue && yValue <= 1.25*rValue);
}


function drawPoint(xValue, yValue, rValue){
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const width = graphic.offsetWidth;
    const height = graphic.offsetHeight;
    const xCircle = 50 + xValue/(rValue*rScale)*100 - radiusCircle/width;
    const yCircle = 50 - (yValue/(rValue*rScale)) * 100 - radiusCircle/height;

    point.setAttribute("cx", xCircle+"%");
    point.setAttribute("cy", yCircle+"%");
    point.setAttribute("r", radiusCircle.toString());
    point.setAttribute("fill", getColor(xValue, yValue, rValue));
    point.setAttribute("data-info", "x="+xValue+"\ny="+yValue);
    overlay.appendChild(point);
    point.addEventListener("mouseover", (e) => {
        showInfo(e);
    });
    point.addEventListener("mouseout",  () =>{
        hideInfo();
    });
}




function validateY(y){
    if (floatRegex.test(y)) {
        const yFloat = parseFloat(y);
        if(-5<yFloat && yFloat<3){
            yError.textContent = "";
            return true;
        }
        else {
            yError.textContent = "Y must be in (-5;3)!";
            return false;
        }
    }
    yError.textContent = "Y must be float!";
    return false;

}


function addPoint(x, y, r){
    const rValue = parseFloat(r);
    if(validateY(y)){
        points.push([x, y]);
        if(isPointFitsGraphic(x, y, rValue)){
            drawPoint(x, y, rValue);
        }
    }
}