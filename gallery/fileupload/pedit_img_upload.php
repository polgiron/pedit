<?php

$PATH_IMG_BIGS =    __DIR__ . '/../photos/bigs/';
$PATH_IMG_THUMBS =  __DIR__ . '/../photos/thumbs/';

// A list of permitted file extensions
$allowed = array('png', 'jpg', 'jpeg', 'gif');

if(isset($_FILES['photo']) && $_FILES['photo']['error'] == 0 && isset($_POST['galleryId'])) {

    $extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $extension = strtolower($extension);

    if(!in_array($extension, $allowed)){
        echo '{"status":"error"}';
        exit;
    }

    $imageTmp = __DIR__ . '/uploads/' . strtolower($_FILES['photo']['name']);

    if(move_uploaded_file($_FILES['photo']['tmp_name'], $imageTmp)) {
        
        include(__DIR__ . '/../pedit_img_bdd.php');
        include(__DIR__ . '/pedit_img_edit.php');

        // on renvoie l'id de l'image pour afficher la miniature
        echo $imgId;

        exit;
    }
}

echo '{"status":"error"}';
exit;