<?php

if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

$req = $bdd->query('SELECT textId, textContent, textType FROM text');
while ($donnees = $req->fetch())
{
	$textContentArray[$donnees['textId']] = $donnees['textContent'];
	$textTypeArray[$donnees['textId']] = $donnees['textType'];
}
$req->closeCursor();