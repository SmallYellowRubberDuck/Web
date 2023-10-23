<%@ page import="server.data.Result" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
        <p>Labwork 1 </p>
        <p>Gordeev Stepan Evgenevich, P3220</p>
        <p>Variant 3001</p>
    </div>
    <div id="main" class="margin" style="justify-content: center">
        <input type="button" id="clear-button" value="Delete results">
        <div id="table-result-container" class="table margin">
            <table id="table-result">
                <thead>
                <tr>
                    <th class="thX">X</th>
                    <th class="thY">Y</th>
                    <th class="thR">R</th>
                    <th class="thRes">Result</th>
                    <th class="thTime">Executed at</th>
                    <th class="thExec">Execution Time</th>
                </tr>
                <%
                    ServletContext ctx = config.getServletContext();
                    ArrayList<Result> history = (ArrayList<Result>) ctx.getAttribute("table");
                    Gson gson = new Gson();
                    String historyInJson = "[]";
                    if (history != null && !history.isEmpty()) {
                        historyInJson = gson.toJson(history);
                    }
                %>

                </thead>
                <tbody></tbody>
            </table>
        </div>
        <input type="button" id="back-to-main-button" value="Back" style="width: 200px">

    </div>
</div>
<script src="scripts/go-to-main.js"></script>
<script src="scripts/history.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        myHistory = <%= historyInJson %>;
        for(let result of myHistory){
            addToFullTable(result.x, result.y, result.r, result.hit, result.time, result.execTime);
        }
    });
    document.getElementById("clear-button").addEventListener("click",()=>{
        clear_table();
    })
</script>
</body>
</html>
