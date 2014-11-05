$(document).ready(function(){

// alert('upload.js');

// le conteneur du loader avec le loader
peditImgUploadLoaderTemplate = $('<div/>')
    .addClass('peditImgUploadLoader')
    .append('<input type="hidden" value="0" data-width="48" data-height="48" data-fgColor="#3e4043" data-readOnly="1" data-bgColor="rgba(227,57,115,0.1)">');
// on crée le template finale pour les photos uploadées
galleryElementTemplate = $('<li/>')
    .addClass('peditGalleryElement peditGalleryElementImage')
    .append(
        $('<a/>').append($('<img/>')),
        peditImgUploadLoaderTemplate.clone(),
        peditDeleteImgTemplate.clone(),
        peditImgEditTitleTemplate.clone(),
        $('<div/>').addClass('peditLoading')
    );

// initialisation du plugin
$('.peditGalleryWrapper').find('form').fileupload({

    // dropZone: $('.peditGalleryAdd'),

    add: function (e, data) {

        // le fichier uploadé
        var uploadFile = data.files[0];

        // alert("uploadFile.size");
        // console.log("upload");

        // si ce n'est pas une image
        if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(uploadFile.name)) {
            // on affiche un message d'erreur
            alert('Ce n\'est pas une image');
        }
        else
        {
            // si la gallerie est vide on vire l'info
            $(this).closest('.peditGalleryWrapper').find('.peditGalleryEmpty').hide();

            // l'id de la gallerie
            var galleryId = $(this).closest('.peditGalleryWrapper').attr('data-galleryid');

            // on spécifie la galerie
            data.formData = {galleryId: galleryId};

            // on crée le conteneur de l'image
            data.context = galleryElementTemplate.clone().insertBefore($(this).parent());
           
            // Initialize the knob plugin
            data.loader = data.context.find('.peditImgUploadLoader input');
            data.loader.knob();

            // on upload l'image
            var jqXHR = data.submit()
            .success(function (imgId, textStatus, jqXHR) {
                // alert(imgId);
                
                data.context
                .attr('data-imgid', imgId);

                data.context.find('a')
                    .attr('href', PEDIT_PATH_GALLERY + 'photos/bigs/' + galleryId + '/' + imgId + '.big.jpg')
                    .attr('title', uploadFile.name)
                    .attr('rel', 'gallery' + galleryId)
                    .fancybox({
                        openEffect : 'fade',
                        nextEffect : 'none',
                        prevEffect : 'none'
                    });

                data.context.find('img')
                    // .attr('src', '../photos/thumbs/' + galleryId + '/' + imgId + '.thumbratio.jpg').hide();
                    .attr('src', PEDIT_PATH_GALLERY + 'photos/thumbs/' + galleryId + '/' + imgId + '.thumbsquare.jpg').hide();

                data.context.find('.peditImgEditTitleWrapper input').val(uploadFile.name);

                data.context.find('.peditImgUploadLoader').fadeOut(400, function(){
                    data.context.find('img').fadeIn(600);
                });
            })
        }
    },

    progress: function(e, data){

        // Calculate the completion percentage of the upload
        var progress = parseInt(data.loaded / data.total * 100, 10);

        // Update the hidden input field and trigger a change
        // so that the jQuery knob plugin knows to update the dial
        data.loader.val(progress).change();

        // if(progress == 100){
        // }
    },

    fail: function(e, data){
        alert('erreur : ' + data);
    }

});

// Prevent the default action when a file is dropped on the window
// $(document).on('drop dragover', function (e) {
//     e.preventDefault();
// });

});