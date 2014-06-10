#Download-Page

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

C'est une page de téléchargement !

Il y a pas de php mais l'intégration avec du php ,pour un achat de produit , serai interssante.

[Demo](http://cedced19.github.io/demo/download-page/)

##Grunt

1. `npm install` (dans le répertoire, avec node.js d'installé, en mode administrateur)
2. `grunt watch`  
 
Et CSS, JS sont compressé !

Toutes les options grunt dans `Gruntfile.js`

* `jshint` : pour les vérification de js.
* `concat` : pour réunir les js.
* `uglify` : pour minifier les js.
* `cssmin` : pour réunir et minifié les css.
* `watch`  : faire `jshint`, `concat`, `uglify` ou `cssmin` à chaque modifications.
* `default`: faire `concat`, `uglify`, `cssmin` à la commande `grunt default`.
* `true`: faire `jshint`, `concat`, `uglify`, `cssmin` à la commande `grunt true`.

Les paquets utilisé sont référencé dans `package.json`
Pour installer des paquets : `npm install <nom du paquet> --save-dev`

Pour plus de détails : [Grafikart](https://www.youtube.com/watch?v=8TVqmCw5S4M)

## License
[CC BY-SA](http://creativecommons.org/licenses/by-sa/4.0/)
