<?php
    $lat = $_POST['lat'];
    $lon = $_POST['lon'];
    $key = YOUR_API_KEY_HERE;
    $url = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&units=metric&appid=$key";
    $fp = fopen($url, 'r', false);
    while(!feof($fp)){
        $out = fgets($fp);
        echo $out;
    }
?>