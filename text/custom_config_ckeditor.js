/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	config.toolbar =
	[
		// { name: 'basicstyles', items : [ 'Bold','Italic','Strike','-','RemoveFormat' ] },
		{ name: 'links', items : [ 'Link','Unlink' ] }
	];

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	// config.removeButtons = 'Underline,Subscript,Superscript';

	// Se the most common block elements.
	// config.format_tags = 'p;h1;h2;h3;pre';

	// Make dialogs simpler.
	// config.removeDialogTabs = 'image:advanced;link:advanced';

	// Copy from word
	// config.pasteFromWordRemoveFontStyles = false;
	// config.pasteFromWordRemoveStyles = false;
};
