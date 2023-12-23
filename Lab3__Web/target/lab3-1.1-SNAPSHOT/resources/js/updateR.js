let showR;
let slider;
let showRGraphic;
let rClickInput;

document.addEventListener("DOMContentLoaded", function () {
    showR = document.getElementById("show-r-value");
    slider = document.getElementById("input-form:r-value_hidden");
    showRGraphic = document.getElementById("show-r-graphic");
    rClickInput = document.getElementById("click-form:r-click-value");
    updateR();
});

function updateR(){
    showR.innerHTML = slider.value;
    showRGraphic.innerHTML = slider.value;
    resizeGraphic(slider.value);
    rClickInput.value = slider.value;
}


function updateSlider(){
    slider.value = parseFloat(showR.textContent);
    rClickInput.value = parseFloat(showR.textContent);
}