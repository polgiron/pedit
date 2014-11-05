<?php

// On inclu les js
if(isset($_SESSION["logged"]) && $_SESSION["logged"] === 1){
	echo '
		<script type="text/javascript" src="../pedit/ckeditor/ckeditor.js"></script>
		<script type="text/javascript" src="../pedit/text/pedit_text.js"></script>
	';
}

// On génère le cache du texte s'il n'existe pas déjà

// Fichier de cache
$cacheContent = __DIR__ . '/cache/pedit_cache_text_content.php';
$cacheType = __DIR__ . '/cache/pedit_cache_text_type.php';
// si le cache n'existe pas on le crée
if (!file_exists($cacheContent)) {

	include (__DIR__ . '/pedit_get_text.php');

	if (isset($textContentArray)) {
		file_put_contents($cacheContent, json_encode($textContentArray));
	}
}
if (!file_exists($cacheType)) {

	include (__DIR__ . '/pedit_get_text.php');

	if (isset($textTypeArray)) {
		file_put_contents($cacheType, json_encode($textTypeArray));
	}
}
// On récupère le cache
$textContentArray = json_decode(file_get_contents($cacheContent), true);
$textTypeArray = json_decode(file_get_contents($cacheType), true);

function displayText($textId)
{
	global $textContentArray;
	global $textTypeArray;
	echo '
		<div class="peditTextEditWrapper">
			<div data-textid="' . $textId . '" data-texttype="' . $textTypeArray[$textId] . '">' . stripslashes($textContentArray[$textId]) . '</div>
		</div>
	';
}