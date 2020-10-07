<?php
    $query = $_POST['query'];
    $key = YOUR_API_KEY_HERE;
    $url = "https://api.giphy.com/v1/gifs/search?api_key=$key&q=$query&limit=25&offset=0&rating=g&lang=en";
    $fp = fopen($url, 'r', false);
    while(!feof($fp)){
        $a = fgets($fp);
        echo $a;
    }
?>