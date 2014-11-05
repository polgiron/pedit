<?php

// connexion bdd
if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

// si c'est une requête ajax
if (!empty($_POST)) {
	// fichier de cache
	$cache = __DIR__ . '/cache/pedit_cache_news_' . $_POST['newsWrapperId'] . '.php';
	// si le cache existe on le supprime
	if (file_exists($cache)) {
		unlink($cache);
	}
	// switch sur le type de requête ajax
	switch ($_POST['ajaxType']) {
		// Cas 1 : ajout d'une news
		case 1:
			try {
				$req = $bdd->prepare('INSERT INTO news (newsTitle,newsContent,newsDate,newsWrapperId) VALUES (:newsTitle,:newsContent,NOW(),:newsWrapperId)');
				$req->execute(array( 
					'newsTitle' => Stripslashes($_POST['newsTitle']),
					'newsContent' => $_POST['newsContent'],
					'newsWrapperId' => $_POST['newsWrapperId']
				));
				$req->closeCursor();

				// GOOD
				echo 1;
			}
			catch (Exception $e) {
				echo 'Erreur catched : ',  $e->getMessage();
			}
			break;

		// Cas 2 : supression d'une news
		case 2:
			try {
				// on supprime la news de la bdd
				$req = $bdd->query('DELETE FROM news WHERE newsId=' . $_POST['newsId']);
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