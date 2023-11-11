async function sendValues(x, y, r, type) {
    const path = "./controller?";
    const data = new URLSearchParams();
    data.append("type", type);
    data.append("x", x);
    data.append("y", y);
    data.append("r", r);

    try {
        const response = await fetch(path+data, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        else {
            const json = await response.json();
            addToTable(x, json.y, json.r, json.hit);
            let dot = [x, json.y, json.r];
            points.push(dot);
            // console.log(x);
            // console.log(json.x);
            drawPoint(x,json.y,json.r);
        }
    }

    catch (error) {
        serverError.textContent = error;
    }
}