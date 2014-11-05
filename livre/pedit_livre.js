$(document).ready(function(){

	////////////////////////////////////////////////////////////////////
	// LIVRE

	//////////////////////////////////////////////////////////////////////////////
	// SELECTORS
	$peditLivreAdd = $('#peditLivreAdd');

	// on sauvegarde le commentaire
	$peditLivreAdd.click(function(){
		// Context
		var context = $peditLivreAdd.parent();
		// on récupère l'id du wrapper
		var livreWrapperId = $(this).closest(".peditLivreWrapper").attr('data-livrewrapperid');
		// auteur
		var livreAuthor = context.children("input[type=text]").val();
		// content 
		var livreContent = context.children("textarea").val();
		// alert('auteur : ' + livreAuthor + ' content : ' + livreContent);

		if (livreContent == '') {
			// on change le texte de l'erreur et on l'affiche
			context.find('.peditLivreError')
			.text("Avez vous quelque chose à dire ?")
			.show();

			return false;
		}
		else if (livreAuthor == '') {
			// on change le texte de l'erreur et on l'affiche
			context.find('.peditLivreError')
			.text('Qui êtes vous ?')
			.show();

			return false;
		}
		// On affiche le chargement
		context.find(".peditLoading").fadeIn(200);
		// On enregistre
		$.post(
			PEDIT_PATH_LIVRE + "pedit_livre_bdd.php",
			{
				ajaxType: 1,
				livreAuthor: livreAuthor,
				livreContent: livreContent,
				livreWrapperId: livreWrapperId
			}
		).done(function(data) {
			if (data == 1) {
				context.find(".peditLoading").removeClass('peditLoading').addClass('peditSuccess');
				location.reload(true);
			}
			else {
				alert('Erreur : ' + data);
			}
		});
	});

});