<?php

// On inclu les js
if(isset($_SESSION["logged"]) && $_SESSION["logged"] === 1){
	echo '
		<script type="text/javascript" src="../pedit/news/pedit_news.js"></script>
		<script>UPLOADCARE_PUBLIC_KEY = "34644a1b68bf0d759a3e";</script>
	';
}

// Générateur de news

function displayNews($newsWrapperId)
{
	// Fichier de cache
	$cache = __DIR__ . '/cache/pedit_cache_news_' . $newsWrapperId . '.php';

	// si le cache n'existe pas on le crée
	if (!file_exists($cache)) {
		ob_start();

		include (__DIR__ . '/pedit_get_news.php');

		// on affiche les news
		echo '<div data-newswrapperid="' . $newsWrapperId . '" class="peditNewsWrapper clearfix">';
		if (isset($newsTab)) {
			foreach ($newsTab as $newsId => $newsTab2) {
				$newsTitle = $newsTab2[0];
				$newsContent = $newsTab2[1];
				$newsDate = $newsTab2[2];

				echo '
				<div data-newsid="' . $newsId . '" class="peditNewsElement bgWhiteShadow">
					<div class="peditNewsHeader clearfix">
						<h1>' . $newsTitle . '</h1>
						<div class="peditNewsDateWrapper">
							<h2>' . date("d.m.Y", strtotime($newsDate)) . '</h2>
						</div>
					</div>
					<div class="peditNewsBody">' . $newsContent . '</div>
				</div>
				';
			}
		}
		else{
			echo '<div class="peditNewsEmpty bgWhiteShadow"><p>Il n\'y a pas de news à afficher.</p></div>';
		}
		// on ferme les news
		echo '</div>';

		$file_content = ob_get_clean();
		file_put_contents($cache, $file_content);
	}
	
	// Finalement on inclut le cache
	include ($cache);
}