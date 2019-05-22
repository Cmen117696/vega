<?php

$files = scandir('json');

$jsons = [];

foreach($files as $file) {
    if ($file == '.' || $file == '..') {
        continue;
    }

    array_push($jsons, $file);
}

header('Access-Control-Allow-Origin:*');

echo json_encode($jsons);
