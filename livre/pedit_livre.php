<?php

// On inclu le js user
echo '
	<script type="text/javascript" src="../pedit/livre/pedit_livre.js"></script>
';

// Si connecté on inclu le js admin
if(isset($_SESSION["logged"]) && $_SESSION["logged"] === 1){
	echo '
		<script type="text/javascript" src="../pedit/livre/pedit_livre_admin.js"></script>
	';
}

// Générateur de livre
function displayLivre($livreWrapperId)
{
	// Fichier de cache
	$cache = __DIR__ . '/cache/pedit_cache_livre_' . $livreWrapperId . '.php';

	// si le cache n'existe pas on le crée
	if (!file_exists($cache)) {
		ob_start();

		include (__DIR__ . '/pedit_get_livre.php');

		// on affiche le livre
		echo '
		<div data-livrewrapperid="' . $livreWrapperId . '" class="peditLivreWrapper clearfix">
			<div id="peditLivreAddWrapper" class="peditLivreElement bgWhiteShadow clearfix">
				<label>Message :</label>
				<textarea></textarea>
				<label>Auteur :</label>
				<input type="text">
				<p class="peditLivreError"></p>
				<p id="peditLivreAdd" class="peditButton">Ajouter</p>
				<div class="peditLoading"></div>
			</div>
		';
		if (isset($livreTab)) {
			foreach ($livreTab as $livreId => $livreTab2) {
				$livreAuthor = $livreTab2[0];
				$livreContent = $livreTab2[1];
				$livreDate = $livreTab2[2];

				echo '
				<div data-livreid="' . $livreId . '" class="peditLivreElement bgWhiteShadow">
					<div class="peditlivreContent">
						<p>' . str_replace(array("\r\n", "\n", "\r"), "<br />", htmlspecialchars($livreContent)) . '</p>
					</div>
					<div class="peditlivreInfos clearfix">
						<p class="peditLivreAuthor">' . $livreAuthor . '</p>
						<p class="peditLivreDate">' . date("d.m.Y", strtotime($livreDate)) . '</p>
					</div>
				</div>
				';
			}
		}
		else{
			echo '
			<div id="peditLivreEmpty" class="peditLivreElement bgWhiteShadow">
				<p>Le livre d\'or est vide.</p>
			</div>';
		}
		// on ferme le livre
		echo '</div>';

		$file_content = ob_get_clean();
		file_put_contents($cache, $file_content);
	}
	
	// Finalement on inclut le cache
	include ($cache);
}