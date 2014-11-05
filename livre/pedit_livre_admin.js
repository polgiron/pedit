$(document).ready(function(){

	////////////////////////////////////////////////////////////////////
	// LIVRE ADMIN

	//////////////////////////////////////////////////////////////////////////////
	// SELECTORS
	$peditLivreElement = $('.peditLivreElement')

	// on ajoute le popup close aux livre
	$peditLivreElement.append(
		$("<div/>").addClass("peditClosePopup peditDeleteLivre"),
		$('<div/>').addClass('peditLoading')
	);

	// affichage du bouton delete livre
	$(document).on(
	{
	    mouseenter: function() 
	    {
	    	$(this).find('.peditDeleteLivre').stop().fadeIn(200);
	    },
	    mouseleave: function()
	    {
	    	$(this).find('.peditDeleteLivre').stop().fadeOut(200);
	    }
	}
	, '*[data-livreid]');

	// suppression
	$(".peditDeleteLivre").click(function(){
		// Context
		var context = $(this).parent();
		// on récupère l'id du wrapper
		var livreWrapperId = context.closest(".peditLivreWrapper").attr('data-livrewrapperid');
		// id du livre à supprimer
		var livreId = context.attr('data-livreid');
		// on affiche le chargement
		context.find('.peditLoading').fadeIn(200);
		// alert(imgId);
		// on supprime le livre en ajax
		$.post(
			PEDIT_PATH_LIVRE + "pedit_livre_bdd.php",
			{
				ajaxType: 2,
				livreId: livreId,
				livreWrapperId: livreWrapperId
			}
		).done(function(data) {
			if (data == 1) {
				context.fadeOut(200);
			}
			else {
				alert('Erreur : ' + data);
			}
		});
	});

});