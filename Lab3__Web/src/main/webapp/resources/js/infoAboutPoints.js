let infoBox;

document.addEventListener("DOMContentLoaded", function () {
    infoBox = document.getElementById("info-box");
});

function showInfo(e){
    infoBox.innerText = e.target.getAttribute("data-info");
    infoBox.style.display = "block";
    const x = e.target.getAttribute("cx");
    const y = e.target.getAttribute("cy");

    const xPercentage = parseFloat(x);
    const yPercentage = parseFloat(y);

    console.log(x, xPercentage);
    console.log(y, yPercentage);
    console.log(infoBox.offsetWidth, graphic.width, infoBox/graphic * 100)

    if(xPercentage > 50){
        infoBox.style.left = xPercentage - infoBox.offsetWidth/graphic.width * 100 + "%";
    }
    else {
        infoBox.style.left = x;
    }

    if(yPercentage > 50){
        infoBox.style.top = yPercentage - infoBox.offsetHeight/graphic.height * 100 + "%";
    }
    else {
        infoBox.style.top = y;
    }
}


function hideInfo(){
    infoBox.style.display = "none";
}