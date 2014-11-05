<?php

if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

$req = $bdd->query('SELECT imgId, imgTitle FROM img WHERE imgGalleryId = ' . $galleryId);
while ($donnees = $req->fetch())
{
	$imgTab[$donnees['imgId']] = $donnees['imgTitle'];
}
$req->closeCursor();