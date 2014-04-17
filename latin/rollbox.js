/**
 * rollBox v1.2
 * 3 Mars 2012
 * Emmanuel 'Manumanu' B.
 **/

(function($){
	$.fn.rollBox = function(options){
		// valeurs par défauts des options
		var defaut = {
			'speed': 'slow',
			'openText': 'Info',
			'closeText': 'Fermer',
		};  
		var params = $.extend(defaut, options);

		return this.each(function(){
			var conteneur = $(this);
			var controleur;
			var alignement = conteneur.hasClass('rb-right') ? true : false;
			var largeur = parseInt(conteneur.css('width'));

			// Ajouter de controleur d'ouverture/fermeture
			conteneur.append('<p class="rb-control">' + params.openText + '</p>');
			controleur = conteneur.children('.rb-control');

			// Masquer la rollBox en appliquant sa largeur en valeur négative
			if (alignement)
				conteneur.css({right: -largeur});
			else
				conteneur.css({left: -largeur});

			controleur.data('clickState', 1);			
			// Au clic sur le controleur
			controleur.on('click', function(){
				if($(this).data('clickState')){
					$(this).html(params.closeText);
					if (alignement)
						$(this).parent().animate({right: 0}, params.speed);
					else
						$(this).parent().animate({left: 0}, params.speed);
				}
				else {
					$(this).html(params.openText);
					if (alignement)
						$(this).parent().animate({right: -largeur}, params.speed);
					else
						$(this).parent().animate({left: -largeur}, params.speed);
				}
				$(this).data('clickState', !$(this).data('clickState'));
			});
		});
	};
})(jQuery);