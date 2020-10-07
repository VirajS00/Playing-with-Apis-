<?php
    $num = rand(1, 2000000);
    $key = YOUR_API_KEY_HERE;
    $url = "http://api.genius.com/songs/$num?access_token=$key";
    $fp = fopen($url, 'r');
    while(!feof($fp)){
        $a = fgets($fp);
        echo $a;
    }   
?>