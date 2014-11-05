<?php

// connexion bdd
if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

// si le cache existe on le supprime
if (isset($_POST['galleryId']) && file_exists(__DIR__ . '/cache/pedit_cache_gallery_' . $_POST['galleryId'] . '.php')) {
	unlink(__DIR__ . '/cache/pedit_cache_gallery_' . $_POST['galleryId'] . '.php');
}

// si c'est une requête ajax
if (isset($_POST['ajaxType'])) {
	// switch sur le type de requête ajax
	switch ($_POST['ajaxType']) {
		// Cas 1 : supression d'une image
		case 1:
			try {
				// on supprime l'image de la bdd
				$req = $bdd->query('DELETE FROM img WHERE imgId=' . $_POST['imgId']);
				$req->closeCursor();

				// on supprime l'image
				unlink(__DIR__ . '/photos/bigs/' . $_POST['galleryId'] . '/' . $_POST['imgId'] . '.big.jpg');
				unlink(__DIR__ . '/photos/thumbs/' . $_POST['galleryId'] . '/' . $_POST['imgId'] . '.thumbratio.jpg');
				unlink(__DIR__ . '/photos/thumbs/' . $_POST['galleryId'] . '/' . $_POST['imgId'] . '.thumbsquare.jpg');

				// GOOD
				echo 1;
			}
			catch (Exception $e) {
				echo 'Erreur catched : ',  $e->getMessage();
			}
			break;

		// Cas 2 : vide la galerie
		case 2:
			try {
				// on vide la galerie dans la bdd
				$req = $bdd->query('DELETE FROM img WHERE imgGalleryId=' . $_POST['galleryId']);
				$req->closeCursor();

				// on vide les dossiers de la galerie
				$files = glob(__DIR__ . '/photos/bigs/' . $_POST['galleryId'] . '/*');
				foreach($files as $file){
					if(is_file($file))
						unlink($file);
				}
				$files = glob(__DIR__ . '/photos/thumbs/' . $_POST['galleryId'] . '/*');
				foreach($files as $file){
					if(is_file($file))
						unlink($file);
				}

				// GOOD
				echo 1;
			}
			catch (Exception $e) {
				echo 'Erreur catched : ',  $e->getMessage();
			}
			break;

		// Cas 3 : changement du titre de l'image
		case 3:
			try {
				// on met à jour le title dans la bdd
				$req = $bdd->prepare('UPDATE img SET imgTitle = :imgTitle WHERE imgId = :imgId');
				$req->execute(array(
					'imgTitle' => Stripslashes($_POST['imgTitle']),
					'imgId' => $_POST['imgId']
				));
				$req->closeCursor();

				// GOOD
				echo 1;
			}
			catch (Exception $e) {
				echo 'Erreur catched : ',  $e->getMessage();
			}
			break;
	}
}

// ce n'est pas une requête ajax
else {
    $galleryId = $_POST['galleryId'];
	$imgTitle = $_FILES['photo']['name'];

	$req = $bdd->prepare('INSERT INTO img (imgTitle,imgGalleryId) VALUES (:imgTitle,:imgGalleryId)');
	$req->execute(array( 
		'imgTitle' => Stripslashes($imgTitle),
		'imgGalleryId' => $galleryId
	));
	// on récupère l'id de la dernière image insérée
	$imgId = $bdd->lastInsertId();
	$req->closeCursor();
}