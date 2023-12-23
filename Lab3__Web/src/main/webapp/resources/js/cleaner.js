let cleatButton;
document.addEventListener("DOMContentLoaded", function () {
    cleatButton = document.getElementById("clear-form:clear-button");
    cleatButton.addEventListener("click", function () {
        cleanAll();
        updateSlider();
    });
});




function cleanCircles(){
    const overlay = document.getElementById("overlay");
    const circles = overlay.getElementsByTagName("circle");
    for(let i = circles.length-1; i >=0; i--){
        overlay.removeChild(circles[i]);
    }
}


function cleanAll(){
    cleanCircles();
    points = [];
    yError.textContent = "";
}