<?php

// connexion bdd
if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

// si c'est une requête ajax
if (!empty($_POST)) {
	// fichier de cache
	$cache = __DIR__ . '/cache/pedit_cache_livre_' . $_POST['livreWrapperId'] . '.php';
	// si le cache existe on le supprime
	if (file_exists($cache)) {
		unlink($cache);
	}
	// switch sur le type de requête ajax
	switch ($_POST['ajaxType']) {
		// Cas 1 : ajout d'un livre
		case 1:
			try {
				$req = $bdd->prepare('
					INSERT INTO livre (livreAuthor,livreContent,livreDate,livreWrapperId) 
					VALUES (:livreAuthor,:livreContent,NOW(),:livreWrapperId)
					');
				$req->execute(array( 
					'livreAuthor' => Stripslashes($_POST['livreAuthor']),
					'livreContent' => Stripslashes($_POST['livreContent']),
					'livreWrapperId' => $_POST['livreWrapperId']
				));
				$req->closeCursor();

				// GOOD
				echo 1;
			}
			catch (Exception $e) {
				echo 'Erreur catched : ',  $e->getMessage();
			}
			break;

		// Cas 2 : supression d'un livre
		case 2:
			try {
				// on supprime le livre de la bdd
				$req = $bdd->query('DELETE FROM livre WHERE livreId = ' . $_POST['livreId']);
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