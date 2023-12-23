let xClickInput;
let yClickInput;

let submitClickButton;
document.addEventListener("DOMContentLoaded", function () {
    xClickInput = document.getElementById("click-form:x-click-value");
    yClickInput = document.getElementById("click-form:y-click-value");
    submitClickButton = document.getElementById("click-form:submit-click-button");
    submitClickButton.addEventListener('click', function () {
        rClickInput.value = slider.value;
    })
});

function checkHitByClick(event){
    updateSlider();

    //todo maybe change the way of getting r
    const rValue = parseFloat(document.getElementById("show-r-value").textContent);
    const relativeY = event.clientY - graphic.getBoundingClientRect().top;
    const relativeX = event.clientX - graphic.getBoundingClientRect().left;
    const width = graphic.offsetWidth;
    const height = graphic.offsetHeight;

    //todo maybe add round
    const x = relativeX/width * rValue * rScale - 0.5*rValue*rScale;
    const y = 0.5*rValue*rScale - relativeY/height * rValue * rScale ;

    xClickInput.value = x;
    yClickInput.value = y;

    points.push([x, y]);

    submitClickButton.click();


    drawPoint(x, y, rValue);
}