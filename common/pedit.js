
//////////////////////////////////////////////////////////////////////////////
// TODO
// internet explorer : un peu de design en galerie (title)
// Nouveau design title photos (c'est moche)







//////////////////////////////////////////////////////////////////////////////
// GET CONTEXT PATH afin d'avoir des liens en absolu dans les fichiers js
// function getContextPath() {
//     var ctx = window.location.pathname;
//     return '/' !== ctx ? ctx.substring(0, ctx.indexOf('/', 1) + 1) : ctx;
// }

// PEDIT_PATH_COMMON =		getContextPath() + "pedit/common/";
// PEDIT_PATH_GALLERY =	getContextPath() + "pedit/gallery/";
// PEDIT_PATH_NEWS =		getContextPath() + "pedit/news/";
// PEDIT_PATH_LIVRE =		getContextPath() + "pedit/livre/";
// PEDIT_PATH_TEXT =		getContextPath() + "pedit/text/";
PEDIT_PATH_COMMON 	=	"/pedit/common/";
PEDIT_PATH_GALLERY 	=	"/pedit/gallery/";
PEDIT_PATH_NEWS 	=	"/pedit/news/";
PEDIT_PATH_LIVRE 	=	"/pedit/livre/";
PEDIT_PATH_TEXT 	=	"/pedit/text/";

// console.log("window.location.pathname" + window.location.pathname);
// console.log("getContextPath" + getContextPath());
console.log("PEDIT_PATH_COMMON" + PEDIT_PATH_COMMON);

$(document).ready(function(){

	if ($('.peditGalleryElement a').length > 0) {
		$('.peditGalleryElement a').fancybox({
	    	openEffect : 'fade',
	        nextEffect : 'none',
	        prevEffect : 'none'
	    });
	}

	// affichage du bouton close popup
	$(document).on(
	{
	    mouseenter: function() 
	    {
	    	$('.peditClosePopupPopup').stop().fadeIn(200);
	    },
	    mouseleave: function()
	    {
	    	$('.peditClosePopupPopup').stop().fadeOut(200);
	    }
	}
	, '.peditPopup');

	// ferme la popup
	$("#peditBack").add(".peditClosePopupPopup").click(function(){
		$(".peditPopup").fadeOut(200, function(){
			$("#peditBack").fadeOut(200);
		});
	});	

	//////////////////////////////////////////////////////////////////////////////
	// CONNEXION

	$("#peditCoLauncher").click(function(){
		$("#peditBack").fadeIn(200, function(){
			$("#peditCoWrapper").fadeIn().find('input[type=password]').focus();
		});
	});
	$("#peditCoWrapper form").submit(function(){
		// on récupère l'identifiant
		var coMdp = $("#peditCoWrapper").find('input[type=password]').val();
		// on se connecte via ajax
		$.ajax({
			url: PEDIT_PATH_COMMON + "ajax_connexion.php",
			type: "POST",
			data: { coMdp: coMdp }
		}).done(function( msg ) {
			if (msg == 1)
			{
				// GOOD
				location.reload(true);
			}
			else
			{
				// ERREUR
				alert("Erreur : " + msg);
			}
		});
		
		return false;
	});
	$(".peditDecoLauncher").click(function(){
		$.ajax({
			url: PEDIT_PATH_COMMON + "ajax_deconnexion.php",
		}).done(function( msg ) {
			if (msg == 1) {
				$("#peditDecoLauncher").text('Bye Bye !');
				location.reload(true);
			}
			else {
				alert("Erreur : veuillez réessayer.");
			}
		});
	});

	//////////////////////////////////////////////////////////////////////////////
	// TOOLS
	// $(".totop").click(function() {
	// 	$("html, body").animate({ scrollTop: 0 }, "fast");
	// 	return false;
	// });

	//////////////////////////////////////////////////////////////////////////////
	// VAR SESSION
	$.ajax({
	    async: false,
		url: PEDIT_PATH_COMMON + "ajax_session.php",
	}).done(function( logged ) {
		// si connecté
		if (logged == 1)
		{
			// on switch les boutons connexion/deconnexion
			$(".peditDecoLauncher").show();
			$("#peditCoLauncher").hide();

			// on ajouter l'icone d'edition de texte
			// $("*[textid]").prepend('<span class="peditIconEdit"></span>');

			// on charge les js de l'admin
			// gallery
			// $.getScript(PEDIT_PATH_GALLERY + "pedit_gallery.js");
			// news
			// $.getScript(PEDIT_PATH_NEWS + "pedit_news.js");
		}
	});

});