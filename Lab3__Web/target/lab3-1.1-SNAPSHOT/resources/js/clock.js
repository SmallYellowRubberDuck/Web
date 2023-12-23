let clock;

const updateRate = 11000;


document.addEventListener("DOMContentLoaded", function () {
    clock = document.getElementById("clock");
    updateTime();
    setInterval(updateTime, updateRate);
});

function updateTime(){
    const now = new Date();
    clock.textContent = now.toLocaleString();
}