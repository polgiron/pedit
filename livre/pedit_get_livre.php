<?php

if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

$req = $bdd->query('SELECT livreId, livreAuthor, livreContent, livreDate FROM livre WHERE livreWrapperId = ' . $livreWrapperId . ' ORDER BY livreId DESC');
while ($donnees = $req->fetch())
{
	$livreTab[$donnees['livreId']][0] = $donnees['livreAuthor'];
	$livreTab[$donnees['livreId']][1] = $donnees['livreContent'];
	$livreTab[$donnees['livreId']][2] = $donnees['livreDate'];
}
$req->closeCursor();