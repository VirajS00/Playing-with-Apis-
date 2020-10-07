<?php
if(isset($_POST['update'])){
    $key = YOUR_API_KEY_HERE;
    $url = 'http://newsapi.org/v2/top-headlines?'.'country=in&'.'sortBy=popularity&'.'apiKey='.$key;
    $fp = fopen($url, 'r', false);
    while(!feof($fp)){
        $a = fgets($fp);
        echo $a;
    }
}
?>