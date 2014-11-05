<?php

// CHECKER LE TYPE D'IMAGE
// if (!isset($extension)) {
// 	$extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
//     $extension = strtolower($extension);
// }

// on crée la variable de l'image uploadée
switch ($extension) {
	case 'jpg':
		// ORIENTATION
		$exif = exif_read_data($imageTmp);

		$imageUp = imagecreatefromjpeg($imageTmp);

		if (isset($exif['Orientation'])) {
			// on oriente l'image jpg suivant l'exif
			switch($exif['Orientation']) {
			    case 3:
			        $imageUp = imagerotate($imageTmp, 180, 0);
			        break;
			    case 6:
			        $imageUp = imagerotate($imageTmp, -90, 0);
			        break;
			    case 8:
			        $imageUp = imagerotate($imageTmp, 90, 0);
			        break;
			}
		}
		break;
	case 'jpeg':
		// ORIENTATION
		$exif = exif_read_data($imageTmp);

		$imageUp = imagecreatefromjpeg($imageTmp);

		if (isset($exif['Orientation'])) {
			// on oriente l'image jpg suivant l'exif
			switch($exif['Orientation']) {
			    case 3:
			        $imageUp = imagerotate($imageTmp, 180, 0);
			        break;
			    case 6:
			        $imageUp = imagerotate($imageTmp, -90, 0);
			        break;
			    case 8:
			        $imageUp = imagerotate($imageTmp, 90, 0);
			        break;
			}
		}
		break;
	case 'png':
		$imageUp = imagecreatefrompng($imageTmp);
		break;
	case 'gif':
		$imageUp = imagecreatefromgif($imageTmp);
		break;
}

// on définit la taille de l'image finale
$largeurVoulue = 800;
$hauteurVoulue = 600;
// on définit la taille de la miniature de l'image
$largeurVoulueThumb = 200;
$hauteurVoulueThumb = 150;

// si l'image est plus grande il faut la redimenssioner sinon on la laisse tel quel

// l'image uploadée est plus grande ou plus petite que ces dimensions ?
$largeurImageUp = imagesx($imageUp);
$hauteurImageUp = imagesy($imageUp);

// echo "largeurImageUp = ".$largeurImageUp."<br />";
// echo "hauteurImageUp = ".$hauteurImageUp."<br />";

if ($largeurImageUp > $largeurVoulue || $hauteurImageUp > $hauteurVoulue)
{
	// l'image est plus grande que les dimenssions voulues
	if ($largeurImageUp >= $hauteurImageUp)
	{
		$largeurImageFinale = $largeurVoulue;
		$reduction = ($largeurImageUp) / $largeurVoulue;
		$hauteurImageFinale = $hauteurImageUp / $reduction;
	}
	else
	{
		$hauteurImageFinale = $hauteurVoulue;
		$reduction = ($hauteurImageUp) / $hauteurVoulue;
		$largeurImageFinale = $largeurImageUp / $reduction;
	}

	// on crée une image plus petite
	$imageFinale = imagecreatetruecolor($largeurImageFinale, $hauteurImageFinale);
	
	// on redimensionne l'image
	imagecopyresampled($imageFinale, $imageUp, 0, 0, 0, 0, $largeurImageFinale, $hauteurImageFinale, $largeurImageUp, $hauteurImageUp);
}
else
{
	// l'image est plus petite que les dimenssions voulues
	$imageFinale = $imageUp;
}

// on crée le dossier de la gallerie s'il n'existe pas
if (!file_exists($PATH_IMG_BIGS . $galleryId)) {
	mkdir($PATH_IMG_BIGS . $galleryId);
}
// on enregistre tout ça
imagejpeg($imageFinale, $PATH_IMG_BIGS . $galleryId . '/' . $imgId . '.big.jpg');


//////////////////////////////////////////////////////////////////////
// maintenant on s'occupe de la miniature

// l'image est plus grande que les dimenssions voulues
// if ($largeurImageUp >= $hauteurImageUp)
// {
// 	$largeurThumbRatio = $largeurVoulueThumb;
// 	$reduction = ($largeurImageUp) / $largeurVoulueThumb;
// 	$hauteurThumbRatio = $hauteurImageUp / $reduction;
// }
// else
// {
// 	$hauteurThumbRatio = $hauteurVoulueThumb;
// 	$reduction = ($hauteurImageUp) / $hauteurVoulueThumb;
// 	$largeurThumbRatio = $largeurImageUp / $reduction;
// }

$hauteurThumbRatio = $hauteurVoulueThumb;
$reduction = ($hauteurImageUp) / $hauteurVoulueThumb;
$largeurThumbRatio = $largeurImageUp / $reduction;

// on crée une image plus petite
$imageThumbRatio = imagecreatetruecolor($largeurThumbRatio, $hauteurThumbRatio);
$imageThumbSquare = imagecreatetruecolor($hauteurVoulueThumb, $hauteurVoulueThumb);

// on redimensionne l'image
imagecopyresampled($imageThumbRatio, $imageUp, 0, 0, 0, 0, $largeurThumbRatio, $hauteurThumbRatio, $largeurImageUp, $hauteurImageUp);
imagecopy($imageThumbSquare, $imageThumbRatio, 0, 0, 0, 0, $hauteurVoulueThumb, $hauteurVoulueThumb);

// on crée le dossier de la gallerie s'il n'existe pas
if (!file_exists($PATH_IMG_THUMBS . $galleryId)) {
	mkdir($PATH_IMG_THUMBS . $galleryId);
}
// on enregistre tout ça
imagejpeg($imageThumbRatio, $PATH_IMG_THUMBS . $galleryId . '/' . $imgId . '.thumbratio.jpg');
imagejpeg($imageThumbSquare, $PATH_IMG_THUMBS . $galleryId . '/' . $imgId . '.thumbsquare.jpg');