<?php

// connexion bdd
if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

// si c'est une requête ajax
if (!empty($_POST)) {
	// fichier de cache
	$cacheContent = __DIR__ . '/cache/pedit_cache_text_content.php';
	// $cacheType = __DIR__ . '/cache/pedit_cache_text_type.php';
	// si le cache existe on le supprime
	if (file_exists($cacheContent)) {
		unlink($cacheContent);
	}
	// if (file_exists($cacheType)) {
	// 	unlink($cacheType);
	// }
	// On update la BDD
	try {
		$req = $bdd->prepare('UPDATE text SET textContent = :textContent WHERE textId = :textId');
		$req->execute(array(
			'textContent' => $_POST['textContent'],
			'textId' => $_POST['textId']
		));
		$req->closeCursor();

		// GOOD
		echo 1;
	}
	catch (Exception $e) {
		echo 'Erreur catched : ',  $e->getMessage();
	}
}