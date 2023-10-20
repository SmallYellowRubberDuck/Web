<?php

error_reporting(-1);

$response = $x = $y = $r = $executed_at = $execution_time = $result = "";

$start = microtime(1);

function isFract($inputString): bool
{
    $regex = '/\.0+([1-9])/';
    return preg_match($regex, $inputString) === 1;
}
date_default_timezone_set('Europe/Moscow');
function check_x($x): bool
{
    return ($x >= -4 and $x <= 4);
}

function check_y($y): bool
{
    return ($y >= -3 and $y <= 5);
}

function check_r($r): bool
{
    return ($r >= 1 and $r <= 5);
}

function check_hit($x, $y, $r): string
{
    // SQUARE check
    if ($x >= 0 and $y >= 0 and $x <= $r/2 and $y <= $r) return "Попадание";
    // CIRCLE check
    else if ($x >= 0 and $y <= 0 and (pow($x, 2) + pow($y, 2) <= pow($r / 2, 2)))
        return "Попадание";
    // TRIANGLE check
    else if ($x <= 0 and $y <= 0 and abs($x)/2 + abs($y) <= $r) return "Попадание";
    // OTHERS
    else return "Промах";
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $x = $_GET["x-select"];
    $y = $_GET["y-select"];
    $r = $_GET["r-select"];

    if (check_x($x) and check_y($y) and check_r($r)) {
        $result = check_hit($x, $y, $r);
    } else {
        $result = "Ошибка введенных данных";
        http_response_code(400);
    }

    $executed_at = date(DATE_RFC2822);
    $execution_time = (microtime(1) - $start) * 1000;
    $response .= $x .= ";";
    $response .= $y .= ";";
    $response .= $r .= ";";
    $response .= $result .= ";";
    $response .= $executed_at .= ";";
    $response .= number_format($execution_time, 4) . " ms";

    echo $response;
}