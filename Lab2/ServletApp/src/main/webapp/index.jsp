<%@ page import="java.util.ArrayList" %>
<%@ page import="server.data.Result" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Lab2</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div id="container" class="margin">
    <div id="header" class="container margin">
        <p>Labwork 2 </p>
        <p>Gordeev Stepan Evgenevich, P3220</p>
        <p>Variant 223307</p>
    </div>
    <div id="main" class="margin">
        <div id="choiceregion" class="container margin">
            <p>Enter parameters:</p>
            <p><b>Attention!</b>Each parameter should be filled and be relevant</p>
            <form method="GET">
                <div id="x-select-container" class="select-container margin">
                    <label for="x-select">Enter X:</label>
                    <div id="x-select-input" class="select-input-container">
                        <span class="error" aria-live="polite" id="xError"></span>
                        <input type="text" onkeyup="this.value = this.value.replace(/[^\d,^.,^-]/g,''); localStorage.setItem('x',this.value)" name="x-select" id="x-select" class="input-select"
                               placeholder="Number between -3 and 5   " required />
                    </div>
                </div>
                <div id="y-select-container" class="select-container margin">
                    <label for="y-select">Choose Y:</label>
                    <div id="y-select" class="select-input-container-r">
                        <input onclick="newY(-4)" value="-4" type="radio" name="y-select" id="y=-4">-4
                        <input onclick="newY(-3)" value="-3" type="radio" name="y-select" id="y=-3">-3
                        <input onclick="newY(-2)" value="-2" type="radio" name="y-select" id="y=-2">-2
                        <input onclick="newY(-1)" value="-1" type="radio" name="y-select" id="y=-1">-1
                        <input onclick="newY(0)" value="0" type="radio" name="y-select" id="y=0" checked>0
                        <input onclick="newY(1)" value="1" type="radio" name="y-select" id="y=1">1
                        <input onclick="newY(2)" value="2" type="radio" name="y-select" id="y=2">2
                        <input onclick="newY(3)" value="3" type="radio" name="y-select" id="y=3">3
                        <input onclick="newY(4)" value="4" type="radio" name="y-select" id="y=4">4
                    </div>
                </div>
                <div id="r-select-container" class="select-container margin">
                    <label for="r-select">Choose R:</label>
                    <div id="r-select-input" class="select-input-container-r">
                        <select name="r-select-input" id="r-select">
                            <option value="1" selected>1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div id="submit-container" class="margin">
                    <span class="error" aria-live="polite" id="allError"></span>
                    <input onclick="clear_table()" type="button" id="clear-button" value="Delete results">
                    <input type="submit" id="submit-button" value="Send request">
                </div>
                <div id="show-table-container" class="margin">
                    <input type="button" id="table-button" value="Table">
                </div>


            </form>
        </div>
        <div id="graph-container" class="container margin">
            <canvas id="graph" width="500px" height="500px"></canvas>
        </div>

        <div id="table-result-container" class="table margin">
            <table id="table-result">
                <thead>
                <tr>
                    <th class="thX">X</th>
                    <th class="thY">Y</th>
                    <th class="thR">R</th>
                    <th class="thRes">Result</th>
                </tr>
                <%
                    ServletContext ctx = config.getServletContext();
                    ArrayList<Result> history = (ArrayList<Result>) ctx.getAttribute("table");
                %>

                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>
<script src="scripts/history.js"></script>
<script src="scripts/graphics.js"></script>
<script src="scripts/validation.js"></script>
<script src="scripts/get-data.js"></script>

<script src="scripts/onLoad.js"></script>
<script src="scripts/sender.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        myHistory = <%= history %>;
        for(let result of myHistory){
            points.push([result.x, result.y, result.r]);
            addToTable(result.x, result.y, result.r, result.hit);
            console.log(result);
        }
    });
</script>
</body>
</html>