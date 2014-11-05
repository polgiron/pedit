$(document).ready(function(){

////////////////////////////////////////////////////////////////////
// GALERIE

// SELECTORS
$galleryWrapper = $('.peditGalleryWrapper');
$galleryElement = $('.peditGalleryElement');
$peditGalleryEditTitle = $('.peditImgEditTitleWrapper p');

// $galleryWrapper.sortable({
// 	items: "li:not(.peditGalleryElementTools)"
// });
// $($galleryWrapper).disableSelection();

//////////////////////////////////////////////////////////////////////////////
// UPLOAD
// on charge les js nécessaires à l'upload
// $.getScript(PEDIT_PATH_GALLERY + "fileupload/js/jquery.ui.widget.js");
// $.getScript(PEDIT_PATH_GALLERY + "fileupload/js/jquery.iframe-transport.js");
// $.getScript(PEDIT_PATH_GALLERY + "fileupload/js/jquery.fileupload.js");
// $.getScript(PEDIT_PATH_GALLERY + "fileupload/js/jquery.knob.js");
// $.getScript(PEDIT_PATH_GALLERY + "fileupload/js/pedit_upload.js");

// on ajoute le launcher ajout d'images à la gallerie
$('<div/>')
.addClass('peditGalleryElement peditGalleryElementTools peditGalleryAdd')
.append(
	$('<form/>')
	.attr('action', PEDIT_PATH_GALLERY + "fileupload/pedit_img_upload.php")
	.attr('method', 'post')
	.attr('enctype', 'multipart/form-data')
	.append(
		'<input style="display:none;" class="peditGalleryAddInput" type="file" name="photo" multiple>',
		$('<div/>')
		.addClass('peditGalleryAddLauncher')
		// click sur le bouton => click sur l'input
		.click(function(){
		    $(this).closest("form").find(".peditGalleryAddInput").click();
		})
	),
	$('<p/>').html('Ajouter<br>des photos')
)
.appendTo('*[data-galleryid]');
// on ajoute le launcher réagencement de la galerie
// $('<div/>')
// .addClass('peditGalleryElement peditGalleryElementTools peditGalleryOrganize')
// .append(
// 	$('<p/>').html('Réorganiser<br>la galerie')
// )
// .click(function(){
// 	var sortedIDs = $galleryWrapper.sortable("toArray", {attribute: "data-imgid"});
// 	alert(sortedIDs);
// })
// .appendTo('*[data-galleryid]');
// on ajoute le bouton clear de la galerie
$('<div/>')
.addClass('peditGalleryClear peditGalleryElement peditGalleryElementTools')
.append(
	$('<p/>')
	.html('Vider<br>la galerie'),
	$('<div/>')
	.addClass('peditGalleryClearConfirm')
	.append(
		$('<p/>').html('Etes vous<br>sûr ?')
	)
	.click(function(){
		// context
		var context = $(this).parent();
		// on affiche le chargement
		context.find('.peditLoading').fadeIn(200);
		// id de la galerie à vider
		var galleryId = $(this).closest($galleryWrapper).attr('data-galleryid');
		// alert(galleryId);
		// on vide la galerie en ajax et on recharge la page
		$.post(
			PEDIT_PATH_GALLERY + "pedit_img_bdd.php",
			{
				ajaxType: 2,
				galleryId: galleryId
			}
		).done(function(data) {
			if (data == 1) {
				// on remplace le chargement par un success
				context.find(".peditLoading")
				.removeClass('peditLoading')
				.addClass('peditSuccess')
				.delay(1000);
				// on reload la page
				location.reload(true);
			}
			else {
				alert('Erreur : ' + data);
			}
		});
	})
)
// Click sur le bouton de vidage de la galerie
.click(function(){
	$(this).children('.peditGalleryClearConfirm').fadeIn(200);
})
// lorsque la souris sort du bouton clear on fadeOut la confirmation
.mouseleave(function(){
	$(this).find('.peditGalleryClearConfirm').fadeOut(200);
})
.appendTo('*[data-galleryid]');
// template du bouton de supression d'image
peditDeleteImgTemplate = $("<div/>").addClass('peditButtonImgDelete peditClosePopup');
// on ajoute le bouton de supression d'image
peditDeleteImgTemplate.clone().appendTo('*[data-imgid]');
// template du popup d'edition de title
peditImgEditTitleTemplate = $('<div/>')
	.addClass('peditImgEditTitleWrapper')
	.append(
		$('<input/>').attr('type', 'text'),
		$('<p/>'),
		$('<div/>').addClass('clear')
	);
peditImgEditTitleTemplate.clone().appendTo('*[data-imgid]');
// template du div de chargement de l'image
// peditImgLoadingTemplate = $('<div/>').addClass('peditLoading').hide();
// div success
// peditImgSuccessTemplate = $('<div/>').addClass('peditSuccess').hide();
// on choppe tout les titles et on remplit les input
$.each($('*[data-imgid]'), function(key,value) {
	// alert($(this).attr('title'));
	$(this).find('input').attr('value', $(this).find('a').attr('title'));
});
// on ajoute les div de chargement aux galleryElement déjà présent
$('*[data-imgid], .peditGalleryClear').append($('<div/>').addClass('peditLoading'));

// affichage des boutons d'edition au hover de la photo
$(document).on(
{
    mouseenter: function() 
    {
        $(this).find('.peditButtonImgDelete, .peditImgEditTitleWrapper').stop().fadeIn(100);
    },
    mouseleave: function()
    {
        $(this).find('.peditButtonImgDelete, .peditImgEditTitleWrapper').stop().fadeOut(100);
    }
}
, '*[data-imgid]');

// supression de l'image
$(document).on("click", ".peditButtonImgDelete", function(e) {
	// on annule le click du a
	e.preventDefault();
	// on définit le contexte : galleryElement
	var context = $(this).parent();
	// id de la galerie à vider
	var galleryId = context.closest($galleryWrapper).attr('data-galleryid');
	// on affiche le chargement
	context.find('.peditLoading').fadeIn(200);
	// on récupère l'id de la photo à supprimer
	var imgId = context.attr('data-imgid');
	// alert(imgId);
	// on supprime la photo en ajax
	$.post(
		PEDIT_PATH_GALLERY + "pedit_img_bdd.php",
		{ ajaxType: 1, imgId: imgId, galleryId: galleryId }
	).done(function(data) {
		if (data == 1) {
			context.remove();
		}
		else {
			alert('Erreur : ' + data);
		}
	});
});

// bouton clear la gallerie
// $('.peditGalleryClear').click(function(){
// 	$(this).find('.peditGalleryClearConfirm').fadeIn(200);
// });
// $('.peditGalleryClearConfirm').click(function(){
// 	// context
// 	var context = $(this).parent();
// 	// on affiche le chargement
// 	context.find('.peditLoading').fadeIn(200);
// 	// id de la galerie à vider
// 	var galleryId = $(this).closest($galleryWrapper).attr('data-galleryid');
// 	// alert(galleryId);
// 	// on vide la galerie en ajax et on recharge la page
// 	$.post(
// 		PEDIT_PATH_GALLERY + "pedit_img_bdd.php",
// 		{ ajaxType: 2, galleryId: galleryId }
// 	).done(function(data) {
// 		if (data == 1) {
// 			// on remplace le chargement par un success
// 			context.find(".peditLoading")
// 			.removeClass('peditLoading')
// 			.addClass('peditSuccess')
// 			.delay(1000);
// 			// on reload la page
// 			location.reload(true);
// 		}
// 		else {
// 			alert('Erreur : ' + data);
// 		}
// 	});
// });
// lorsque la souris sort du bouton clear on fadeOut la confirmation
// $('.peditGalleryClear').mouseleave(function(){
// 	$(this).find('.peditGalleryClearConfirm').fadeOut(200);
// });

// lorsqu'on edit le title
$(document).on("click", ".peditImgEditTitleWrapper p", function(e) {
	// context : wrapper de editTitle
	var context = $(this).closest('.peditGalleryElement');
	// quelle galerie
	var galleryId = context.closest($galleryWrapper).attr('data-galleryid');
	// on cache les div d'edition
	context.find('.peditImgEditWrapper, .peditImgEditTitleWrapper').stop().fadeOut(100);
	// on affiche le chargement
	context.find('.peditLoading').fadeIn(200);
	// id de la photo
	var imgId = context.attr('data-imgid');
	// title de la photo
	var imgTitle = context.find('.peditImgEditTitleWrapper input').val();
	// alert(imgId + ' ' + imgTitle);
	// on edit le title en ajax
	$.post(
		PEDIT_PATH_GALLERY + "pedit_img_bdd.php",
		{ ajaxType: 3, galleryId: galleryId, imgTitle: imgTitle, imgId: imgId }
	).done(function(data) {
		if (data == 1) {
			// success : on met à jour le title de l'image
			context.find('a').attr('title', imgTitle);
			// on remplace le chargement par un success
			context.find(".peditLoading")
			.removeClass('peditLoading')
			.addClass('peditSuccess')
			.delay(500).fadeOut(200);
		}
		else {
			alert('Erreur : ' + data);
		}
	});
});

});