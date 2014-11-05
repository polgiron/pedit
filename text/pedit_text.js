$(document).ready(function(){

	////////////////////////////////////////////////////////////////////
	// TEXT
	
	//////////////////////////////////////////////////////////////////////////////
	// SELECTORS
	$peditTextEditableWrapper = $('.peditTextEditWrapper');
	$peditTextEditable = $('*[data-textid]');

	// on ajoute le bouton d'édition
	$peditTextEditableWrapper.append(
		$('<div/>')
		.addClass('peditTextButton peditTextButtonEdit')
		.click(function(e){
			// On enlève le comportement par default des liens
			e.preventDefault();
			// On supprime l'ancienne toolbar cke
			$("#ckeInlineToolbar").remove();
			// On ajoute la toolbar cke
			$(this).parent().append(
				$("<div/>").attr("id", "ckeInlineToolbar")
			);
			// On focus le texte à éditer avec CKEDITOR
			CKEDITOR.inline($(this).parent().children("[data-textid]").get(0), {
				customConfig: PEDIT_PATH_TEXT + 'custom_config_ckeditor.js',
				extraPlugins: 'sharedspace',
		        sharedSpaces: {
		            top: 'ckeInlineToolbar'
		        }
			}); 
			$(this).parent().children("[data-textid]")
			.attr("contenteditable", "true")
			.click(function(e){
				// On enlève le comportement par default des liens
				e.preventDefault();
			})
			// .on('paste', function(e) {
			//     e.preventDefault();
			//     document.execCommand('inserttext', false, prompt('Paste something.'));
			// })
			.focus();
			// On cache le bouton d'édition
			$(this).hide();
			// On ajoute le bouton pour enregistrer
			$(this).parent().append(
				$("<div/>")
				.addClass("peditTextButton peditTextButtonSave")
				.click(function(e){
					// On enlève le comportement par default des liens
					e.preventDefault();
					// On fou le chargement
					$(this).removeClass('peditTextButtonSave').addClass('peditTextButtonLoading');
					// On récupère l'id du text
					var textId = $(this).parent().children("[data-textid]").attr("data-textid");
					// On chope le text
					var textContent = $(this).parent().children("[data-textid]").html();
					// On enregistre en ajax
					$.post(
						PEDIT_PATH_TEXT + "pedit_text_bdd.php",
						{
							textId: textId,
							textContent: textContent
						}
					).done(function(data) {
						if (data == 1) {
							location.reload(true);
						}
						else {
							alert('Erreur : ' + data);
						}
					});
				})
			);
		})
	);

	// Empêche le collage de texte stylé
	// $('[contenteditable]').on('paste', function(e) {
	//     e.preventDefault();
	//     document.execCommand('inserttext', false, prompt('Paste something.'));
	// });

	// on sauvegarde la nouvelle news
	// $(document).on("click", "#peditNewsAddSave", function(e) {
	// 	// on récupère l'id du wrapper
	// 	var newsWrapperId = $(this).closest(".peditNewsWrapper").attr('data-newswrapperid');
	// 	// context
	// 	var context = $(this).closest($peditNewsElement);
	// 	// on affiche le chargement
	// 	context.find(".peditLoading").fadeIn(200);
	// 	// titre de la news
	// 	var newsTitle = context.find('#peditNewsTitleInput').val();
	// 	// content de la news
	// 	var newsContent = get_ckeditor_content();
	// 	// alert('title : ' + newsTitle + ' content : ' + newsContent);

	// 	if (newsTitle == '') {
	// 		// on change le texte de l'erreur
	// 		context.find('.peditNewsErrorText').text('Veuillez préciser le titre de la news');
	// 		// On enlève le chargement et on affiche l'erreur
	// 		context.find(".peditLoading").hide();
	// 		context.find($peditNewsBack).fadeIn(200);

	// 		return false;
	// 	}
	// 	else if (newsContent == '') {
	// 		// on change le texte de l'erreur
	// 		context.find('.peditNewsErrorText').text('Vous n\'avez pas rédigé la news.');
	// 		// On enlève le chargement et on affiche l'erreur
	// 		context.find(".peditLoading").hide();
	// 		context.find($peditNewsBack).fadeIn(200);

	// 		return false;
	// 	}
	// 	// On enregistre
	// 	$.post(
	// 		PEDIT_PATH_NEWS + "pedit_news_bdd.php",
	// 		{
	// 			ajaxType: 1,
	// 			newsTitle: newsTitle,
	// 			newsContent: newsContent,
	// 			newsWrapperId: newsWrapperId
	// 		}
	// 	).done(function(data) {
	// 		if (data == 1) {
	// 			context.find(".peditLoading").removeClass('peditLoading').addClass('peditSuccess');
	// 			location.reload(true);
	// 		}
	// 		else {
	// 			alert('Erreur : ' + data);
	// 		}
	// 	});
	// });

});