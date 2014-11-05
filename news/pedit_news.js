$(document).ready(function(){

	////////////////////////////////////////////////////////////////////
	// NEWS

	// on charge les js nécessaires aux news
	// ckeditor
	window.CKEDITOR_BASEPATH = PEDIT_PATH_NEWS + "../ckeditor/";
	$.getScript(PEDIT_PATH_NEWS + "../ckeditor/ckeditor.js");

	// function CKEDITOR
	function get_ckeditor_content() {
		var editor = CKEDITOR.instances.ckeditorTextarea;
		return editor.getData();
	}

	// on affiche l'ajout de news
	$('<div/>')
		.addClass('peditNewsElement peditNewsElementEdit bgWhiteShadow')
		.append(
			$('<div/>')
				.addClass('peditNewsHeader clearfix')
				.append(
					$('<input/>')
						.attr('type', 'text')
						.attr('id', 'peditNewsTitleInput')
						.attr('placeholder', 'Titre de l\'info...'),
					$('<p/>')
						.text('Ajouter')
						.attr('id', 'peditNewsAddSave')
						.addClass('peditButton peditButtonConfirm')
				),
			$('<textarea/>')
				.addClass('ckeditor')
				.attr('id', 'ckeditorTextarea')
				.attr('name','ckeditorTextarea'),
			$('<div/>')
				.addClass('peditNewsBack')
				.append(
					$('<div/>')
						.addClass('peditNewsErrorBox bgWhiteShadow')
						.append(
							$('<p/>').addClass('peditNewsErrorText'),
							$('<p/>')
								.text('Cliquez pour fermer')
								.addClass('peditNewsErrorTextClose')
						)
				)
		)
		.prependTo('.peditNewsWrapper');

	//////////////////////////////////////////////////////////////////////////////
	// SELECTORS
	$peditNewsElement = $('.peditNewsElement');
	$peditNewsAddSave = $('#peditNewsAddSave');
	$peditNewsBack = $('.peditNewsBack');

	// on ajoute le popup close aux news
	$peditNewsElement.append(
		$("<div/>").addClass("peditClosePopup peditDeleteNews"),
		$('<div/>').addClass('peditLoading')
	);

	// affichage du bouton delete news
	$(document).on(
	{
	    mouseenter: function() 
	    {
	    	$(this).find('.peditDeleteNews').stop().fadeIn(200);
	    },
	    mouseleave: function()
	    {
	    	$(this).find('.peditDeleteNews').stop().fadeOut(200);
	    }
	}
	, '*[data-newsid]');

	// on sauvegarde la nouvelle news
	$(document).on("click", "#peditNewsAddSave", function(e) {
		// on récupère l'id du wrapper
		var newsWrapperId = $(this).closest(".peditNewsWrapper").attr('data-newswrapperid');
		// context
		var context = $(this).closest($peditNewsElement);
		// on affiche le chargement
		context.find(".peditLoading").fadeIn(200);
		// titre de la news
		var newsTitle = context.find('#peditNewsTitleInput').val();
		// content de la news
		var newsContent = get_ckeditor_content();
		// alert('title : ' + newsTitle + ' content : ' + newsContent);

		if (newsTitle == '') {
			// on change le texte de l'erreur
			context.find('.peditNewsErrorText').text('Veuillez préciser le titre de la news');
			// On enlève le chargement et on affiche l'erreur
			context.find(".peditLoading").hide();
			context.find($peditNewsBack).fadeIn(200);

			return false;
		}
		else if (newsContent == '') {
			// on change le texte de l'erreur
			context.find('.peditNewsErrorText').text('Vous n\'avez pas rédigé la news.');
			// On enlève le chargement et on affiche l'erreur
			context.find(".peditLoading").hide();
			context.find($peditNewsBack).fadeIn(200);

			return false;
		}
		// On enregistre
		$.post(
			PEDIT_PATH_NEWS + "pedit_news_bdd.php",
			{
				ajaxType: 1,
				newsTitle: newsTitle,
				newsContent: newsContent,
				newsWrapperId: newsWrapperId
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

	// quand on click sur l'erreur ça la ferme
	$peditNewsBack.click(function(){
		$(this).fadeOut(200);
	});

	// suppression de la news
	$(document).on("click", ".peditDeleteNews", function(e) {
		// on annule le click du a
		// e.preventDefault();
		// on récupère l'id du wrapper
		var newsWrapperId = $(this).closest(".peditNewsWrapper").attr('data-newswrapperid');
		// on définit le contexte
		var context = $(this).parent();
		// id de la news à supprimer
		var newsId = context.attr('data-newsid');
		// on affiche le chargement
		context.find('.peditLoading').fadeIn(200);
		// alert(imgId);
		// on supprime la news en ajax
		$.post(
			PEDIT_PATH_NEWS + "pedit_news_bdd.php",
			{
				ajaxType: 2,
				newsId: newsId,
				newsWrapperId: newsWrapperId
			}
		).done(function(data) {
			if (data == 1) {
				context.slideToggle();
			}
			else {
				alert('Erreur : ' + data);
			}
		});
	});

});