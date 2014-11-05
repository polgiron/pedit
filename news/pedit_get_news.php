<?php

if (!isset($bdd)) {
	include(__DIR__ . '/../common/connexion_sql.php');
}

$req = $bdd->query('SELECT newsId, newsTitle, newsContent, newsDate FROM news WHERE newsWrapperId = ' . $newsWrapperId . ' ORDER BY newsId DESC');
while ($donnees = $req->fetch())
{
	$newsTab[$donnees['newsId']][0] = $donnees['newsTitle'];
	$newsTab[$donnees['newsId']][1] = $donnees['newsContent'];
	$newsTab[$donnees['newsId']][2] = $donnees['newsDate'];
}
$req->closeCursor();