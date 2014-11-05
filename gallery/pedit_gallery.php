<?php

// On inclu les js
if(isset($_SESSION["logged"]) && $_SESSION["logged"] === 1){
	echo '
		<script type="text/javascript" src="../pedit/gallery/pedit_gallery.js"></script>
		<script type="text/javascript" src="../pedit/gallery/fileupload/js/jquery.ui.widget.js"></script>
		<script type="text/javascript" src="../pedit/gallery/fileupload/js/jquery.iframe-transport.js"></script>
		<script type="text/javascript" src="../pedit/gallery/fileupload/js/jquery.fileupload.js"></script>
		<script type="text/javascript" src="../pedit/gallery/fileupload/js/jquery.knob.js"></script>
		<script type="text/javascript" src="../pedit/gallery/fileupload/js/pedit_upload.js"></script>
	';
}

// FANCYBOX
echo '
	<link rel="stylesheet" href="../pedit/fancybox/jquery.fancybox.css" type="text/css" media="screen">
	<script type="text/javascript" src="../pedit/fancybox/jquery.fancybox.pack.js"></script>
';

// on vide les images en cache
$files = glob(__DIR__ . '/fileupload/uploads/*'); // get all file names
foreach($files as $file){ // iterate files
	if(is_file($file))
		unlink($file); // delete file
}

// On génère la galerie si pas en cache
function displayGallery($galleryId)
{
	// Fichier de cache
	$cache = __DIR__ . '/cache/pedit_cache_gallery_' . $galleryId . '.php';

	// si le cache n'existe pas on le crée
	if (!file_exists($cache)) {
		ob_start();

		include (__DIR__ . '/pedit_get_gallery.php');

		// on affiche la galerie
		echo '<ul data-galleryid="' . $galleryId . '" class="peditGalleryWrapper clearfix">';

		if (isset($imgTab)) {
			foreach ($imgTab as $imgId => $imgTitle) {
				echo '
				<li data-imgid="' . $imgId . '" class="peditGalleryElement peditGalleryElementImage">
					<a href="../pedit/gallery/photos/bigs/' . $galleryId . '/' . $imgId . '.big.jpg" title="' . $imgTitle . '" rel="gallery' . $galleryId . '">
						<img src="../pedit/gallery/photos/thumbs/' . $galleryId . '/' . $imgId . '.thumbsquare.jpg" title="' . $imgTitle . '" alt="' . $imgTitle . '">
					</a>
				</li>
				';
			}
		}
		else{
			echo '<li class="peditGalleryElement peditGalleryEmpty"><p>La galerie photo<br>est vide</p></li>';
		}

		// on ferme la galerie
		echo '</ul>';

		$file_content = ob_get_clean();
		file_put_contents($cache, $file_content);
	}
	
	// Finalement on inclut le cache
	include ($cache);
}